export class SupplierModel {
    id: number;
    name: string;
    asiNumber: string;
    hasInventory: boolean;
    hasLogin: boolean;
    hasOrderStatus: boolean;
    hasOrderStatusImplementation: boolean;
    hasOrderShipmentImplementation: boolean;
    hasOrderCreation: boolean;
    hasProductIntegration: boolean;
    hasServiceProviderLogin: boolean;

    public constructor(init?: Partial<SupplierModel>) {
        Object.assign(this, init);
    }
}