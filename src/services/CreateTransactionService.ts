import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const typeTransaction = type;

    const cash = this.transactionsRepository.getBalance();

    if (typeTransaction !== 'income' && typeTransaction !== 'outcome') {
      throw Error('This type is not valid transaction');
    }

    if (typeTransaction === 'outcome' && cash.total < value) {
      throw Error('Insufficient balance not performed');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
