import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrxPurchase } from './model/trx-purchase.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/createTrx.dto';
import { UserService } from '../user/user.service';
import { Motorcycle } from '../motorcycle/model/motorcycle.entity';
import { User } from '../user/model/user.model';
import { TrxDetailPurchase } from '../trx-detail-purchase/model/trx-detail-purchase.entity';
import { MessageService } from '../message/message.service';
import { Transactional } from 'typeorm-transactional';
import { ITrxDetailResponse } from './interface/TrxResponse.interface';

@Injectable()
export class TrxPurchaseService {
  constructor(
    @InjectRepository(TrxPurchase)
    private trxPurchaseRepository: Repository<TrxPurchase>,

    @InjectRepository(TrxDetailPurchase)
    private trxDetailPurchaseRepository: Repository<TrxDetailPurchase>,

    @InjectRepository(Motorcycle)
    private motorcycleRepository: Repository<Motorcycle>,

    private userService: UserService,
    private messageService: MessageService,
  ) {}

  @Transactional()
  public async createTransaction(
    userId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<ITrxDetailResponse> {
    const user: User = await this.userService.findUserById(userId);
    const userBalance: number = createTransactionDto.userBalance;

    const trxPurchase: TrxPurchase = new TrxPurchase();
    trxPurchase.user = user;
    trxPurchase.totalTransactionPrice = 0;
    trxPurchase.transactionDetails = [];

    if (!createTransactionDto.listOfProducts.length)
      throw new BadRequestException('List of products cannot be empty');

    for (const product of createTransactionDto.listOfProducts) {
      const motorcycle: Motorcycle = await this.motorcycleRepository.findOneBy({
        id: product.motorcycleId,
      });

      if (!motorcycle) throw new NotFoundException('Motorcycle not found');

      if (motorcycle.stock < product.quantity)
        throw new BadRequestException('Not enough stock');

      motorcycle.stock -= product.quantity;
      await this.motorcycleRepository.save(motorcycle);

      const trxDetailPurchase: TrxDetailPurchase = new TrxDetailPurchase();
      trxDetailPurchase.motorcycle = motorcycle;
      trxDetailPurchase.quantity = product.quantity;
      trxDetailPurchase.totalPrice = motorcycle.price * product.quantity;
      trxDetailPurchase.trxPurchase = trxPurchase;

      trxPurchase.transactionDetails.push(trxDetailPurchase);
      trxPurchase.totalTransactionPrice += trxDetailPurchase.totalPrice;

      await this.trxPurchaseRepository.save(trxPurchase);
      await this.trxDetailPurchaseRepository.save(trxDetailPurchase);
    }

    if (userBalance < trxPurchase.totalTransactionPrice)
      throw new BadRequestException('Balance not enough');

    this.messageService.setMessage('Create transaction successfully');
    return this.transformDetailTransactionPurchase(trxPurchase);
  }

  private transformDetailTransactionPurchase(
    trxPurchase: TrxPurchase,
  ): ITrxDetailResponse {
    return {
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
  }
}
