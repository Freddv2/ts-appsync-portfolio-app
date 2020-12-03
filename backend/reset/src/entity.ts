export type Table = "STOCK" | "TRANSACTION"

export interface AppSyncEvent {
    info: {
        fieldName: string // graphql function name
    },
    arguments: {
        table: Table // graphql function parameter
    }
}
