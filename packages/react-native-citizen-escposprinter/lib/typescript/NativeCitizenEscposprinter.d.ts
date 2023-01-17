import type { TurboModule } from "react-native";
export interface Spec extends TurboModule {
    multiply(a: number, b: number): Promise<number>;
    searchESCPOSPrinter(ifType: number, timeout: number): Promise<string[]>;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeCitizenEscposprinter.d.ts.map