import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrxPurchase } from './model/trx-purchase.entity';
import { QueryRunner, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/createTrx.dto';
import { UserService } from '../user/user.service';
import { Motorcycle } from '../motorcycle/model/motorcycle.entity';
import { User } from '../user/model/user.model';
import { TrxDetailPurchase } from '../trx-detail-purchase/model/trx-detail-purchase.entity';
import { MessageService } from '../message/message.service';
import { ICreateTrxResponse } from './interface/CreateTrxResponse.interface';

@Injectable()
export class TrxPurchaseService {
  constructor(
    @InjectRepository(TrxPurchase)
    private trxPurchaseRepository: Repository<TrxPurchase>,

    @InjectRepository(Motorcycle)
    private motorcycleRepository: Repository<Motorcycle>,

    private userService: UserService,
    private messageService: MessageService,
  ) {}

  async createTransaction(
    userId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<ICreateTrxResponse> {
    const queryRunner: QueryRunner =
      this.trxPurchaseRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user: User = await this.userService.findUserById(userId);
      const userBalance: number = createTransactionDto.userBalance;

      const trxPurchase = new TrxPurchase();
      trxPurchase.user = user;
      trxPurchase.totalTransactionPrice = 0;
      trxPurchase.transactionDetails = [];

      if (!createTransactionDto.listOfProducts.length)
        throw new BadRequestException('List of products cannot be empty');

      for (const product of createTransactionDto.listOfProducts) {
        const motorcycle: Motorcycle =
          await this.motorcycleRepository.findOneBy({
            id: product.motorcycleId,
          });

        if (!motorcycle) throw new NotFoundException('Motorcycle not found');

        if (motorcycle.stock < product.quantity)
          throw new BadRequestException('Not enough stock');

        motorcycle.stock -= product.quantity;
        await queryRunner.manager.save(motorcycle);

        const trxDetailPurchase: TrxDetailPurchase = new TrxDetailPurchase();
        trxDetailPurchase.motorcycle = motorcycle;
        trxDetailPurchase.quantity = product.quantity;
        trxDetailPurchase.totalPrice = motorcycle.price * product.quantity;
        trxDetailPurchase.trxPurchase = trxPurchase;

        trxPurchase.transactionDetails.push(trxDetailPurchase);
        trxPurchase.totalTransactionPrice += trxDetailPurchase.totalPrice;

        await queryRunner.manager.save(trxPurchase);
        await queryRunner.manager.save(trxDetailPurchase);
      }

      if (userBalance < trxPurchase.totalTransactionPrice)
        throw new BadRequestException('Balance not enough');

      await queryRunner.commitTransaction();

      const transformData: ICreateTrxResponse = {
        id: trxPurchase.id,
        totalTransactionPrice: trxPurchase.totalTransactionPrice,
        user: {
          id: trxPurchase.user.id,
          name: trxPurchase.user.name,
          email: trxPurchase.user.email,
        },
        transactionDetails: trxPurchase.transactionDetails.map(
          (trxDetail: TrxDetailPurchase) => {
            return {
              id: trxDetail.id,
              motorcycle: {
                id: trxDetail.motorcycle.id,
                name: trxDetail.motorcycle.name,
              },
              totalPrice: trxDetail.motorcycle.price * trxDetail.quantity,
              quantity: trxDetail.quantity,
            };
          },
        ),
        createdAt: trxPurchase.createdAt,
      };

      this.messageService.setMessage('Create transaction successfully');
      return transformData;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new Error(error.message);
      }
    } finally {
      await queryRunner.release();
    }
  }
}
