//
//  CitizenEscposprinter.swift
//  CitizenEscposprinter
//
//  Created by Vicary Archangel on 25/01/2023.
//  Copyright © 2023 Facebook. All rights reserved.
//

import Foundation
import CSJPOSLibSwift

@objc(CitizenEscposprinter)
class CitizenEscposprinter: NSObject {
    var priner: ESCPOSPrinter? = ESCPOSPrinter()
    
    @objc
    func getVersionCode(resolve: @escaping RCTPromiseResolveBlock,
                        rejecter reject: @escaping RCTPromiseRejectBlock) {
        resolve(priner!.getVersionCode())
    }
    
    @objc
    func getVersionName(resolve: @escaping RCTPromiseResolveBlock,
                        rejecter reject: @escaping RCTPromiseRejectBlock) {
        resolve(priner!.getVersionName())
    }
}
