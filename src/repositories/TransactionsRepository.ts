import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {

    const findAllTransactions = this.transactions.map(transaction => ({
      ...transaction
    }),
   );

      if(findAllTransactions) {
        throw Error( 'No transacitions found' );
      }
    return this.transactions;
  }

 public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce((
      groupTransaction: Balance,
      transaction: Transaction ) => {

        switch (transaction.type) {
          case 'income':
            groupTransaction.income += transaction.value;
            break;
          case 'outcome':
            groupTransaction.outcome += transaction.value;
            break;
          default:
            break;
        }

      return groupTransaction;
    }, {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO ) : Transaction {
    const transaction = new Transaction({
      title,
      value,
      type
    });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
