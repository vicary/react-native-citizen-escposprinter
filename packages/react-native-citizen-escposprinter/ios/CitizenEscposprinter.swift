import CSJPOSLibSwift
import Foundation

let queue = DispatchQueue(label: "CitizenESCPOSPrinter", qos: .userInitiated)

@objc(CitizenEscposprinter)
class CitizenEscposprinter: NSObject {
  var printer: ESCPOSPrinter? = ESCPOSPrinter()

  internal func handleRejection(
    reject: RCTPromiseRejectBlock,
    errorCode: Int32
  ) {
    let errorCodeEx = self.printer!.getErrorCodeExtended()

    if errorCodeEx > 0 {
      reject("ESCSPOSPrinter", String(errorCodeEx), nil)
    } else {
      reject("ESCSPOSPrinter", String(errorCode), nil)
    }
  }

  internal func handleRejection(
    reject: RCTPromiseRejectBlock,
    message: String
  ) {
    // NSError(domain: message, code: 0, userInfo: nil)
    reject("ESCSPOSPrinter", message, nil)
  }

  internal func ipToNumber(_ ip: String) -> UInt32 {
    return ip.split(separator: ".").reduce(0) { (result, part) -> UInt32 in
      return result << 8 + UInt32(part)!
    }
  }

  @objc
  func connect(
    _ type: Double,
    toAddress addr: NSString?,
    withPort port: NSNumber,
    waitFor timeout: NSNumber,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let argType = Int32(type)
    let argAddr = addr as String?

    queue.async {
      var result = ESCPOSConst.CMP_E_ILLEGAL

      switch argType {
      case ESCPOSConst.CMP_PORT_BLUETOOTH, ESCPOSConst.CMP_PORT_WiFi:
        let argPort = Int32(truncating: port!)
        let argTimeout = Int32(truncating: timeout!)

        switch (argPort, argTimeout) {
        case (let port, let timeout) where port <= 0 && timeout <= 0:
          result = self.printer!.connect(
            argType,
            withAddrress: argAddr
          )
        case (_, let timeout) where timeout <= 0:
          result = self.printer!.connect(
            argType,
            withAddrress: argAddr,
            withPort: argPort
          )
        default:
          result = self.printer!.connect(
            argType,
            withAddrress: argAddr,
            withPort: argPort,
            withTimeout: argTimeout
          )
        }
      case ESCPOSConst.CMP_PORT_USB, ESCPOSConst.CMP_PORT_SNMP:
        result = self.printer!.connect(
          argType
        )
      default:
        result = ESCPOSConst.CMP_E_ILLEGAL
      }

      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func disconnect(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.disconnect()

      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func setEncoding(
    _ encoding: NSString?,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let cfEnc = CFStringConvertIANACharSetNameToEncoding(encoding as CFString?)
      let nsEnc = CFStringConvertEncodingToNSStringEncoding(cfEnc)
      guard nsEnc != kCFStringEncodingInvalidId else {
        self.handleRejection(reject: reject, message: "Invalid encoding")
        return
      }

      let result = self.printer!.setEncoding(String.Encoding(rawValue: nsEnc))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func printerCheck(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.printerCheck()
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func status(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      resolve(self.printer!.status())
    }
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
    queue.async {
      let result = self.printer!.printText(
        data as String?,
        withAlignment: Int32(side),
        withAttribute: Int32(attr),
        withTextSize: Int32(size)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
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
    queue.async {
      let result = self.printer!.printPaddingText(
        data as String?,
        withAttribute: Int32(attr),
        withTextSize: Int32(size),
        withLength: Int32(length),
        withSide: Int32(side)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
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
    queue.async {
      let result = self.printer!.printTextLocalFont(
        data as String?,
        withAlignment: Int32(side),
        withFontName: font as String,
        withPoint: Int32(size),
        withStyle: Int32(attr),
        withHRatio: Int32(hRatio),
        withVRatio: Int32(vRatio)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
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
    queue.async {
      guard data != nil,
        let imageData = Data(base64Encoded: data! as String, options: .ignoreUnknownCharacters),
        let image = UIImage(data: imageData)
      else {
        self.handleRejection(reject: reject, message: "Expected image data.")
        return
      }

      let result = self.printer!.printBitmapData(
        image,
        withWidth: Int32(size),
        withAlignment: Int32(side),
        withMode: Int32(mode)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func printNVBitmap(
    _ imageId: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.printNVBitmap(Int32(imageId))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
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
    queue.async {
      let result = self.printer!.printBarCode(
        data as String?,
        withSymbology: Int32(symbology),
        withHeight: Int32(height),
        withWidth: Int32(width),
        withAlignment: Int32(side),
        withTextPosition: Int32(textPosition)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
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
    queue.async {
      let result = self.printer!.printPDF417(
        data as String?,
        withDigits: Int32(digits),
        withSteps: Int32(steps),
        withModuleWidth: Int32(width),
        withStepHeight: Int32(height),
        withECLevel: Int32(ecLevel),
        withAlignment: Int32(side)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
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
    queue.async {
      let result = self.printer!.printQRCode(
        data as String?,
        withModuleSize: Int32(size),
        withECLevel: Int32(ecLevel),
        withAlignment: Int32(side)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
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
    queue.async {
      let result = self.printer!.printGS1DataBarStacked(
        data as String?,
        withSymbology: Int32(symbology),
        withModuleSize: Int32(size),
        withMaxWidth: Int32(maxWidth),
        withAlignment: Int32(side)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func cutPaper(
    _ percentage: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.cutPaper(Int32(percentage))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func unitFeed(
    _ dots: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.unitFeed(Int32(dots))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func markFeed(
    _ type: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.markFeed(Int32(type))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func openDrawer(
    _ drawer: Double,
    withPulseLength pulseLength: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.openDrawer(Int32(drawer), withPulseLength: Int32(pulseLength))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func transactionPrint(
    _ control: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.transactionPrint(Int32(control))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func rotatePrint(
    _ rotation: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.rotatePrint(Int32(rotation))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func pageModePrint(
    _ control: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.pageModePrint(Int32(control))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func clearPrintArea(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.clearPrintArea()
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func clearOutput(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.clearOutput()
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func printData(
    _ data: NSString?,
    withLength size: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard data != nil else {
      self.handleRejection(reject: reject, message: "Expected raw data.")
      return
    }

    queue.async {
      guard var rawData = Data(base64Encoded: data! as String, options: .ignoreUnknownCharacters)
      else {
        self.handleRejection(reject: reject, message: "Expected raw data.")
        return
      }

      rawData.withUnsafeMutableBytes({ (bytes) -> Void in
        let typedBuffer = bytes.bindMemory(to: Int8.self)
        let result = self.printer!.printData(typedBuffer.baseAddress!, withLength: UInt(size))
        guard result == CMP_SUCCESS else {
          self.handleRejection(reject: reject, errorCode: result)
          return
        }

        resolve(nil)
      })
    }
  }

  @objc
  func printNormal(
    _ data: NSString?,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard data != nil else {
      self.handleRejection(reject: reject, message: "Expected raw data.")
      return
    }

    queue.async {
      let result = self.printer!.printNormal(data! as String)
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
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
    queue.async {
      let result = self.printer!.watermarkPrint(
        Int32(start),
        withNVImageNumber: Int32(imageId),
        withPass: Int32(pass),
        withFeed: Int32(feed),
        withRepeat: Int32(reps)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
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

    queue.async {
      let result: UnsafeMutablePointer<Int32> = UnsafeMutablePointer<Int32>.allocate(capacity: 1)
      guard
        let printers =
          (self.printer!.searchCitizenPrinter(
            Int32(connectType),
            withSearchTime: Int32(time),
            result: result
          ) as? [CitizenPrinterInfo])?.sorted(by: {
            (a: CitizenPrinterInfo, b: CitizenPrinterInfo) -> Bool in
            switch (a, b) {
            case let (a, b) where a.ipAddress != b.ipAddress:
              return self.ipToNumber(a.ipAddress) < self.ipToNumber(b.ipAddress)
            case let (a, b) where a.macAddress != b.macAddress:
              return a.macAddress < b.macAddress
            case let (a, b) where a.deviceName != b.deviceName:
              return a.deviceName < b.deviceName
            case let (a, b) where a.bdAddress != b.bdAddress:
              return a.bdAddress < b.bdAddress
            case let (a, b) where a.usbSerialNo != b.usbSerialNo:
              return a.usbSerialNo < b.usbSerialNo
            default:
              return false
            }
          }).map({ (printer) -> NSDictionary in
            type == CMP_PORT_WiFi
              ? [
                "ipAddress": printer.ipAddress!,
                "macAddress": printer.macAddress!,
              ]
              : type == CMP_PORT_BLUETOOTH
                ? [
                  "bdAddress": printer.bdAddress!,
                  "deviceName": printer.deviceName!,
                ]
                : [
                  "deviceName": printer.deviceName!,
                  "usbSerialNo": printer.usbSerialNo!,
                ]
          })
      else {
        self.handleRejection(reject: reject, errorCode: CMP_E_ILLEGAL)
        return
      }

      let exitCode = result.pointee
      guard exitCode == CMP_SUCCESS || exitCode == CMP_E_NO_LIST else {
        self.handleRejection(reject: reject, errorCode: exitCode)
        return
      }

      resolve(printers)
    }
  }

  @objc
  func searchESCPOSPrinter(
    _ connectType: Double,
    withSearchTime time: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result: UnsafeMutablePointer<Int32> = UnsafeMutablePointer<Int32>.allocate(capacity: 1)
      guard
        let printers =
          (self.printer!.searchESCPOSPrinter(
            Int32(connectType),
            withSearchTime: Int32(time),
            result: result
          ) as? [String])?.sorted(by: { self.ipToNumber($0) < self.ipToNumber($1) })
      else {
        self.handleRejection(reject: reject, errorCode: CMP_E_ILLEGAL)
        return
      }

      let exitCode = result.pointee
      guard exitCode == CMP_SUCCESS || exitCode == CMP_E_NO_LIST else {
        self.handleRejection(reject: reject, errorCode: exitCode)
        return
      }

      resolve(printers)
    }
  }

  @objc
  func printerCheckEx(
    _ connectType: Double,
    toAddress addr: NSString?,
    withPort port: NSNumber,
    waitFor timeout: NSNumber,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let argType = Int32(connectType)
    let argAddr = addr as String?

    queue.async {
      var result = ESCPOSConst.CMP_E_ILLEGAL
      var status = 0

      switch argType {
      case ESCPOSConst.CMP_PORT_BLUETOOTH, ESCPOSConst.CMP_PORT_WiFi:
        let argPort = Int32(truncating: port!)
        let argTimeout = Int32(truncating: timeout!)

        switch (argPort, argTimeout) {
        case (let port, let timeout) where port <= 0 && timeout <= 0:
          result = self.printer!.printerCheck(
            &status,
            withConnectType: argType,
            withAddrress: argAddr
          )
        case (_, let timeout) where timeout <= 0:
          result = self.printer!.printerCheck(
            &status,
            withConnectType: argType,
            withAddrress: argAddr,
            withPort: argPort
          )
        default:
          result = self.printer!.printerCheck(
            &status,
            withConnectType: argType,
            withAddrress: argAddr,
            withPort: argPort,
            withTimeout: argTimeout
          )
        }
      case ESCPOSConst.CMP_PORT_USB, ESCPOSConst.CMP_PORT_SNMP:
        result = self.printer!.printerCheck(
          &status,
          withConnectType: argType
        )
      default:
        result = ESCPOSConst.CMP_E_ILLEGAL
      }

      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(status)
    }
  }

  @objc
  func openDrawerEx(
    _ drawer: Double,
    withPulseLength pulseLength: Double,
    connectType type: Double,
    toAddress addr: NSString?,
    withPort port: NSNumber,
    waitFor timeout: NSNumber,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let argDrawer = Int32(drawer)
    let argPulseLength = Int32(pulseLength)
    let argType = Int32(type)
    let argAddr = addr as String?

    queue.async {
      var result = ESCPOSConst.CMP_E_ILLEGAL

      switch argType {
      case ESCPOSConst.CMP_PORT_BLUETOOTH, ESCPOSConst.CMP_PORT_WiFi:
        let argPort = Int32(truncating: port!)
        let argTimeout = Int32(truncating: timeout!)

        switch (argPort, argTimeout) {
        case (let port, let timeout) where port <= 0 && timeout <= 0:
          result = self.printer!.openDrawerEx(
            argDrawer,
            withPulseLength: argPulseLength,
            withConnectType: argType,
            withAddrress: argAddr
          )
        case (_, let timeout) where timeout <= 0:
          result = self.printer!.openDrawerEx(
            argDrawer,
            withPulseLength: argPulseLength,
            withConnectType: argType,
            withAddrress: argAddr,
            withPort: argPort
          )
        default:
          result = self.printer!.openDrawerEx(
            argDrawer,
            withPulseLength: argPulseLength,
            withConnectType: argType,
            withAddrress: argAddr,
            withPort: argPort,
            withTimeout: argTimeout
          )
        }
      case ESCPOSConst.CMP_PORT_USB, ESCPOSConst.CMP_PORT_SNMP:
        result = self.printer!.openDrawerEx(
          argDrawer,
          withPulseLength: argPulseLength,
          withConnectType: argType
        )
      default:
        result = ESCPOSConst.CMP_E_ILLEGAL
      }

      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func setPrintCompletedTimeout(
    _ timeout: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.setPrintCompletedTimeout(Int32(timeout))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
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
    queue.async {
      let result = self.printer!.setLog(
        Int32(mode),
        withPath: path,
        withMaxSize: Int32(size)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func getVersionCode(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    resolve(self.printer!.getVersionCode())
  }

  @objc
  func getVersionName(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    resolve(self.printer!.getVersionName())
  }

  @objc
  func getPageModeArea(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    resolve(self.printer!.getPageModeArea())
  }

  @objc
  func getPageModePrintArea(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    resolve(self.printer!.getPageModePrintArea())
  }

  @objc
  func setPageModeArea(
    _ area: NSString?,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.setPageModeArea(data)
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func getPageModePrintDirection(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    resolve(self.printer!.getPageModePrintDirection())
  }

  @objc
  func setPageModePrintDirection(
    _ direction: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.setPageModePrintDirection(Int32(direction))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func getPageModeHorizontalPosition(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    resolve(self.printer!.getPageModeHorizontalPosition())
  }

  @objc
  func setPageModeHorizontalPosition(
    _ position: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.setPageModeHorizontalPosition(Int32(position))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func getPageModeVerticalPosition(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    resolve(self.printer!.getPageModeVerticalPosition())
  }

  @objc
  func setPageModeVerticalPosition(
    _ position: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.setPageModeVerticalPosition(Int32(position))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func getRecLineSpacing(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    resolve(self.printer!.getRecLineSpacing())
  }

  @objc
  func setRecLineSpacing(
    _ spacing: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.setRecLineSpacing(Int32(spacing))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func getMapMode(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    resolve(self.printer!.getMapMode())
  }

  @objc
  func setMapMode(
    _ mode: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let result = self.printer!.setMapMode(Int32(mode))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result)
        return
      }

      resolve(nil)
    }
  }
}
