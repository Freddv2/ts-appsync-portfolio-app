import {Construct} from "@aws-cdk/core";
import {AttributeType, Table} from "@aws-cdk/aws-dynamodb";

export class DynamoDB extends Construct {
    readonly portfolioTable: Table
    readonly transactionTable: Table

    constructor(scope: Construct, id: string) {
        super(scope, id)

        this.portfolioTable = new Table(this, 'PortfolioTable', {
            tableName: 'PORTFOLIO',
            partitionKey: {name: 'portfolioId', type: AttributeType.STRING},
            sortKey: {name: 'stock', type: AttributeType.STRING},
            readCapacity: 1,
            writeCapacity: 1
        });

        this.transactionTable = new Table(this, 'TransactionTable', {
            tableName: 'TRANSACTION',
            partitionKey: {name: 'id', type: AttributeType.STRING},
            readCapacity: 1,
            writeCapacity: 1
        });
    }
}
