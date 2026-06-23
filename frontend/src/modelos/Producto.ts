export interface Producto {
  partNumber: string;
  productType?: string;
  categoryCode: string;
  brandCode?: string;
  familyCode?: string;
  lineCode?: string;
  productSegmentCode?: string;
  status: string;
  value: number;
  valueCurrency: string;
  defaultQuantityUnits?: string;
  name: string;
  description: string;
  plannerCode?: string;
  sourceLink: string;
}