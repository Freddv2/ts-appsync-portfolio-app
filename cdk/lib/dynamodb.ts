import {Construct, RemovalPolicy} from "@aws-cdk/core";
import {AttributeType, StreamViewType, Table} from "@aws-cdk/aws-dynamodb";

export class DynamoDB extends Construct {
    readonly portfolioTable: Table
    readonly stockTable: Table
    readonly transactionTable: Table

    constructor(scope: Construct, id: string) {
        super(scope, id)

        this.portfolioTable = new Table(this, 'PortfolioTable', {
            tableName: 'PORTFOLIO',
            partitionKey: {name: 'id', type: AttributeType.STRING},
            readCapacity: 1,
            writeCapacity: 1,
            removalPolicy: RemovalPolicy.DESTROY
        });

        this.stockTable = new Table(this, 'StockTable', {
            tableName: 'STOCK',
            partitionKey: {name: 'portfolioId', type: AttributeType.STRING},
            sortKey: {name: 'stock', type: AttributeType.STRING},
            readCapacity: 1,
            writeCapacity: 1,
            removalPolicy: RemovalPolicy.DESTROY
        });

        this.transactionTable = new Table(this, 'TransactionTable', {
            tableName: 'TRANSACTION',
            partitionKey: {name: 'portfolioId', type: AttributeType.STRING},
            sortKey: {name: 'id', type: AttributeType.STRING},
            readCapacity: 1,
            writeCapacity: 1,
            removalPolicy: RemovalPolicy.DESTROY,
            stream: StreamViewType.NEW_IMAGE // Stream all write
        });
    }
}
