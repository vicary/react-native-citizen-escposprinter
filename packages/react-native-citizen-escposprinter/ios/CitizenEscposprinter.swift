//
//  CitizenEscposprinter.swift
//  CitizenEscposprinter
//
//  Created by Vicary Archangel on 25/01/2023.
//  Copyright © 2023 Facebook. All rights reserved.
//

import CSJPOSLibSwift
import Foundation

@objc(CitizenEscposprinter)
class CitizenEscposprinter: NSObject {
  var printer: ESCPOSPrinter? = ESCPOSPrinter()

  internal func handleRejection(
    reject: RCTPromiseRejectBlock,
    errorCode: Int32
  ) {
    reject("ESCSPOSPrinter", String(errorCode), nil)
  }

  internal func handleRejection(
    reject: RCTPromiseRejectBlock,
    message: String
  ) {
    // NSError(domain: message, code: 0, userInfo: nil)
    reject("ESCSPOSPrinter", message, nil)
  }

  @objc
  func connect(
    _ type: Double,
    toAddress address: NSString?,
    withPort port: Double,
    waitFor timeout: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    var result: Int32 = 0
    let argType = Int32(type)
    let argAddress = address as String?
    let argPort = port == nil ? nil : Int32(port)
    let argTimeout = timeout == nil ? nil : Int32(timeout)

    if argPort == nil {
      result = printer!.connect(
        argType,
        withAddrress: argAddress
      )
    } else if argTimeout == nil {
      result = printer!.connect(
        argType,
        withAddrress: argAddress,
        withPort: argPort!
      )
    } else {
      result = printer!.connect(
        argType,
        withAddrress: argAddress,
        withPort: argPort!,
        withTimeout: argTimeout!
      )
    }

    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func disconnect(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.disconnect()
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func setEncoding(
    _ encoding: NSString? = nil,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let cfEnc = CFStringConvertIANACharSetNameToEncoding(encoding as CFString?)
    let nsEnc = CFStringConvertEncodingToNSStringEncoding(cfEnc)
    if nsEnc == kCFStringEncodingInvalidId {
      return handleRejection(reject: reject, message: "Invalid encoding")
    }

    let result = printer!.setEncoding(String.Encoding(rawValue: nsEnc))
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func printerCheck(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.printerCheck()
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func status(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    return resolve(printer!.status())
  }

  @objc
  func printText(
    _ data: NSString?,
    alignedTo side: Double,
    withFontStyle attr: Double,
    ofSize size: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.printText(
      data as String?,
      withAlignment: Int32(side),
      withAttribute: Int32(attr),
      withTextSize: Int32(size)
    )
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func printPaddingText(
    _ data: NSString?,
    withFontStyle attr: Double,
    ofSize size: Double,
    paddedTo length: Double,
    alignedTo side: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.printPaddingText(
      data as String?,
      withAttribute: Int32(attr),
      withTextSize: Int32(size),
      withLength: Int32(length),
      withSide: Int32(side)
    )
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func printTextLocalFont(
    _ data: NSString?,
    alignedTo side: Double,
    withTypeface font: NSString,
    ofSize size: Double,
    withFontStyle attr: Double,
    withHRatio hRatio: Double,
    withVRatio vRatio: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.printTextLocalFont(
      data as String?,
      withAlignment: Int32(side),
      withFontName: font as String,
      withPoint: Int32(size),
      withStyle: Int32(attr),
      withHRatio: Int32(hRatio),
      withVRatio: Int32(vRatio)
    )
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func printBitmap(
    _ data: NSString?,
    inWidth size: Double,
    alignedTo side: Double,
    withBlendMode mode: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    if data == nil {
      return handleRejection(reject: reject, message: "Expected image data.")
    }
    let imageData = Data(base64Encoded: data! as String, options: .ignoreUnknownCharacters)
    if imageData == nil {
      return handleRejection(reject: reject, message: "Expected image data.")
    }
    let image = UIImage(data: imageData!)
    if image == nil {
      return handleRejection(reject: reject, message: "Expected image data.")
    }
    let result = printer!.printBitmapData(
      image!,
      withWidth: Int32(size),
      withAlignment: Int32(side),
      withMode: Int32(mode)
    )
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func printNVBitmap(
    _ imageId: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.printNVBitmap(Int32(imageId))
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func printBarcode(
    _ data: NSString?,
    withSymbology symbology: Double,
    inHeight height: Double,
    inWidth width: Double,
    alignedTo side: Double,
    withTextPosition textPosition: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.printBarCode(
      data as String?,
      withSymbology: Int32(symbology),
      withHeight: Int32(height),
      withWidth: Int32(width),
      withAlignment: Int32(side),
      withTextPosition: Int32(textPosition)
    )
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }
  @objc
  func printPDF417(
    _ data: NSString?,
    withDigits digits: Double,
    withSteps steps: Double,
    withModuleWidth width: Double,
    withStepHeight height: Double,
    withECLevel ecLevel: Double,
    alignedTo side: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.printPDF417(
      data as String?,
      withDigits: Int32(digits),
      withSteps: Int32(steps),
      withModuleWidth: Int32(width),
      withStepHeight: Int32(height),
      withECLevel: Int32(ecLevel),
      withAlignment: Int32(side)
    )
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func printQRCode(
    _ data: NSString?,
    withModuleSize size: Double,
    withECLevel ecLevel: Double,
    alignedTo side: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.printQRCode(
      data as String?,
      withModuleSize: Int32(size),
      withECLevel: Int32(ecLevel),
      withAlignment: Int32(side)
    )
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func printGS1DataBarStacked(
    _ data: NSString?,
    withSymbology symbology: Double,
    withModuleSize size: Double,
    withMaxWidth maxWidth: Double,
    alignedTo side: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.printGS1DataBarStacked(
      data as String?,
      withSymbology: Int32(symbology),
      withModuleSize: Int32(size),
      withMaxWidth: Int32(maxWidth),
      withAlignment: Int32(side)
    )
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func cutPaper(
    _ percentage: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.cutPaper(Int32(percentage))
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func unitFeed(
    _ dots: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.unitFeed(Int32(dots))
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func markFeed(
    _ type: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.markFeed(Int32(type))
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func openDrawer(
    _ drawer: Double,
    withPulseLength pulseLength: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.openDrawer(Int32(drawer), withPulseLength: Int32(pulseLength))
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func transactionPrint(
    _ control: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.transactionPrint(Int32(control))
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func rotatePrint(
    _ rotation: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.rotatePrint(Int32(rotation))
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func pageModePrint(
    _ control: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.pageModePrint(Int32(control))
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func clearPrintArea(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.clearPrintArea()
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func clearOutput(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.clearOutput()
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func printData(
    _ data: NSString?,
    withLength size: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    if data == nil {
      return handleRejection(reject: reject, message: "Expected raw data.")
    }

    var rawData = Data(base64Encoded: data! as String, options: .ignoreUnknownCharacters)
    if rawData == nil {
      return handleRejection(reject: reject, message: "Expected raw data.")
    }

    rawData!.withUnsafeMutableBytes({ (bytes) -> Void in
      let typedBuffer = bytes.bindMemory(to: Int8.self)
      let result = printer!.printData(typedBuffer.baseAddress!, withLength: UInt(size))
      if result != CMP_SUCCESS {
        return handleRejection(reject: reject, errorCode: result)
      } else {
        return resolve(nil)
      }
    })

  }

  @objc
  func printNormal(
    _ data: NSString?,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    if data == nil {
      return handleRejection(reject: reject, message: "Expected raw data.")
    }

    let result = printer!.printNormal(data! as String)
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func watermarkPrint(
    _ start: Double,
    withNVImageNumber imageId: Double,
    withPass pass: Double,
    withFeed feed: Double,
    withRepeat reps: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.watermarkPrint(
      Int32(start),
      withNVImageNumber: Int32(imageId),
      withPass: Int32(pass),
      withFeed: Int32(feed),
      withRepeat: Int32(reps)
    )
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func searchCitizenPrinter(
    _ connectType: Double,
    withSearchTime time: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let type = Int32(connectType)
    let result: UnsafeMutablePointer<Int32> = UnsafeMutablePointer<Int32>.allocate(capacity: 1)
    let printers =
      printer!.searchCitizenPrinter(
        Int32(connectType),
        withSearchTime: Int32(time),
        result: result
      ) as? [CitizenPrinterInfo]
    if printers == nil {
      return handleRejection(reject: reject, errorCode: CMP_E_ILLEGAL)
    }

    let exitCode = result.pointee
    if exitCode != CMP_SUCCESS && exitCode != CMP_E_NO_LIST {
      return handleRejection(reject: reject, errorCode: exitCode)
    }

    let printerList =
      type == CMP_PORT_WiFi
      ? printers!.map({ (printer) -> NSDictionary in
        return [
          "ipAddress": printer.ipAddress!,
          "macAddress": printer.macAddress!,
        ]
      })
      : type == CMP_PORT_BLUETOOTH
        ? printers!.map({ (printer) -> NSDictionary in
          return [
            "deviceName": printer.deviceName!,
            "bdAddress": printer.bdAddress!,
          ]
        })
        : type == CMP_PORT_USB
          ? printers!.map({ (printer) -> NSDictionary in
            return [
              "deviceName": printer.deviceName!,
              "usbSerialNo": printer.usbSerialNo!,
            ]
          }) : []

    return resolve(printerList)
  }

  @objc
  func searchESCPOSPrinter(
    _ connectType: Double,
    withSearchTime time: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result: UnsafeMutablePointer<Int32> = UnsafeMutablePointer<Int32>.allocate(capacity: 1)
    let printers =
      printer!.searchESCPOSPrinter(
        Int32(connectType),
        withSearchTime: Int32(time),
        result: result
      ) as? [String]
    if printers == nil {
      return handleRejection(reject: reject, errorCode: CMP_E_ILLEGAL)
    }

    let exitCode = result.pointee
    if exitCode != CMP_SUCCESS && exitCode != CMP_E_NO_LIST {
      return handleRejection(reject: reject, errorCode: exitCode)
    }

    return resolve(printers)
  }

  @objc
  func setPrintCompletedTimeout(
    _ timeout: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.setPrintCompletedTimeout(Int32(timeout))
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func setLog(
    _ mode: Double,
    withPath path: String,
    limitTo size: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let result = printer!.setLog(
      Int32(mode),
      withPath: path,
      withMaxSize: Int32(size)
    )
    if result != CMP_SUCCESS {
      return handleRejection(reject: reject, errorCode: result)
    } else {
      return resolve(nil)
    }
  }

  @objc
  func getVersionCode(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    return resolve(printer!.getVersionCode())
  }

  @objc
  func getVersionName(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    return resolve(printer!.getVersionName())
  }
}
