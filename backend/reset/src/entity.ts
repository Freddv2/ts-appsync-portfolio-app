export type Table = "PORTFOLIO" | "TRANSACTION"

export interface AppSyncEvent {
    info: {
        fieldName: string // graphql function name
    },
    arguments: {
        input: Table // graphql function parameter
    }
}
