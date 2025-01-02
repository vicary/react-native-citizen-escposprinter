import CSJPOSLibSwift
import Foundation

let queue = DispatchQueue(label: "CitizenESCPOSPrinter", qos: .userInitiated)

@objc(CitizenEscposprinter)
class CitizenEscposprinter: NSObject {
  var printers: [ESCPOSPrinter?] = []

  internal func handleRejection(
    reject: RCTPromiseRejectBlock,
    errorCode: Int32,
    printer: ESCPOSPrinter
  ) {
    let errorCodeEx = printer.getErrorCodeExtended()

    guard errorCodeEx == 0 else {
      reject("CitizenESCPOSPrinter", String(errorCodeEx), nil)
      return
    }

    reject("ESCSPOSPrinter", String(errorCode), nil)
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
      let printer = ESCPOSPrinter()

      switch argType {
      case ESCPOSConst.CMP_PORT_BLUETOOTH, ESCPOSConst.CMP_PORT_WiFi:
        let argPort = Int32(truncating: port)
        let argTimeout = Int32(truncating: timeout)

        switch (argPort, argTimeout) {
        case (let port, let timeout) where port <= 0 && timeout <= 0:
          result = printer.connect(
            argType,
            withAddrress: argAddr
          )
        case (_, let timeout) where timeout <= 0:
          result = printer.connect(
            argType,
            withAddrress: argAddr,
            withPort: argPort
          )
        default:
          result = printer.connect(
            argType,
            withAddrress: argAddr,
            withPort: argPort,
            withTimeout: argTimeout
          )
        }
      case ESCPOSConst.CMP_PORT_USB, ESCPOSConst.CMP_PORT_SNMP:
        result = printer.connect(
          argType,
          withAddrress: argAddr
        )
      default:
        result = ESCPOSConst.CMP_E_ILLEGAL
      }

      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      self.printers.append(printer)

      resolve(self.printers.count - 1)
    }
  }

  @objc
  func disconnect(
    _ printerId: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      let intId = Int(printerId)
      guard let printer = self.printers[intId] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.disconnect()

      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      self.printers[intId] = nil

      resolve(nil)
    }
  }

  @objc
  func setEncoding(
    _ printerId: Double,
    to encoding: NSString?,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let cfEnc = CFStringConvertIANACharSetNameToEncoding(encoding as CFString?)
      let nsEnc = CFStringConvertEncodingToNSStringEncoding(cfEnc)
      guard nsEnc != kCFStringEncodingInvalidId else {
        self.handleRejection(reject: reject, message: "Invalid encoding")
        return
      }

      let result = printer.setEncoding(String.Encoding(rawValue: nsEnc))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func printerCheck(
    _ printerId: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.printerCheck()
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func status(
    _ printerId: Double,
    ofType type: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      resolve(printer.status())
    }
  }

  @objc
  func printText(
    _ printerId: Double,
    withData data: NSString?,
    alignedTo side: Double,
    withFontStyle attr: Double,
    ofSize size: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.printText(
        data as String?,
        withAlignment: Int32(side),
        withAttribute: Int32(attr),
        withTextSize: Int32(size)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func printPaddingText(
    _ printerId: Double,
    withData data: NSString?,
    withFontStyle attr: Double,
    ofSize size: Double,
    paddedTo length: Double,
    alignedTo side: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.printPaddingText(
        data as String?,
        withAttribute: Int32(attr),
        withTextSize: Int32(size),
        withLength: Int32(length),
        withSide: Int32(side)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func printTextLocalFont(
    _ printerId: Double,
    withData data: NSString?,
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
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.printTextLocalFont(
        data as String?,
        withAlignment: Int32(side),
        withFontName: font as String,
        withPoint: Int32(size),
        withStyle: Int32(attr),
        withHRatio: Int32(hRatio),
        withVRatio: Int32(vRatio)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func printBitmap(
    _ printerId: Double,
    withData data: NSString?,
    inWidth size: Double,
    alignedTo side: Double,
    withBlendMode mode: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      guard data != nil,
        let imageData = Data(base64Encoded: data! as String, options: .ignoreUnknownCharacters),
        let image = UIImage(data: imageData)
      else {
        self.handleRejection(reject: reject, message: "Expected image data.")
        return
      }

      let result = printer.printBitmapData(
        image,
        withWidth: Int32(size),
        withAlignment: Int32(side),
        withMode: Int32(mode)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func printNVBitmap(
    _ printerId: Double,
    withImageId imageId: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.printNVBitmap(Int32(imageId))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func printBarcode(
    _ printerId: Double,
    withData data: NSString?,
    withSymbology symbology: Double,
    inHeight height: Double,
    inWidth width: Double,
    alignedTo side: Double,
    withTextPosition textPosition: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.printBarCode(
        data as String?,
        withSymbology: Int32(symbology),
        withHeight: Int32(height),
        withWidth: Int32(width),
        withAlignment: Int32(side),
        withTextPosition: Int32(textPosition)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func printPDF417(
    _ printerId: Double,
    withData data: NSString?,
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
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.printPDF417(
        data as String?,
        withDigits: Int32(digits),
        withSteps: Int32(steps),
        withModuleWidth: Int32(width),
        withStepHeight: Int32(height),
        withECLevel: Int32(ecLevel),
        withAlignment: Int32(side)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func printQRCode(
    _ printerId: Double,
    withData data: NSString?,
    withModuleSize size: Double,
    withECLevel ecLevel: Double,
    alignedTo side: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.printQRCode(
        data as String?,
        withModuleSize: Int32(size),
        withECLevel: Int32(ecLevel),
        withAlignment: Int32(side)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func printGS1DataBarStacked(
    _ printerId: Double,
    withData data: NSString?,
    withSymbology symbology: Double,
    withModuleSize size: Double,
    withMaxWidth maxWidth: Double,
    alignedTo side: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.printGS1DataBarStacked(
        data as String?,
        withSymbology: Int32(symbology),
        withModuleSize: Int32(size),
        withMaxWidth: Int32(maxWidth),
        withAlignment: Int32(side)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func cutPaper(
    _ printerId: Double,
    to percentage: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.cutPaper(Int32(percentage))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func unitFeed(
    _ printerId: Double,
    forDots dots: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.unitFeed(Int32(dots))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func markFeed(
    _ printerId: Double,
    ofType type: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.markFeed(Int32(type))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func openDrawer(
    _ printerId: Double,
    at drawer: Double,
    withPulseLength pulseLength: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.openDrawer(Int32(drawer), withPulseLength: Int32(pulseLength))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func transactionPrint(
    _ printerId: Double,
    at control: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.transactionPrint(Int32(control))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func rotatePrint(
    _ printerId: Double,
    to rotation: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.rotatePrint(Int32(rotation))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func pageModePrint(
    _ printerId: Double,
    at control: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.pageModePrint(Int32(control))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func clearPrintArea(
    _ printerId: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.clearPrintArea()
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func clearOutput(
    _ printerId: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.clearOutput()
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func printData(
    _ printerId: Double,
    withData data: NSString?,
    withLength size: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard data != nil else {
      self.handleRejection(reject: reject, message: "Expected raw data.")
      return
    }

    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      guard var rawData = Data(base64Encoded: data! as String, options: .ignoreUnknownCharacters)
      else {
        self.handleRejection(reject: reject, message: "Expected raw data.")
        return
      }

      rawData.withUnsafeMutableBytes({ (bytes) -> Void in
        let typedBuffer = bytes.bindMemory(to: Int8.self)
        let result = printer.printData(typedBuffer.baseAddress!, withLength: UInt(size))
        guard result == CMP_SUCCESS else {
          self.handleRejection(reject: reject, errorCode: result, printer: printer)
          return
        }

        resolve(nil)
      })
    }
  }

  @objc
  func printNormal(
    _ printerId: Double,
    withData data: NSString?,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard data != nil else {
      self.handleRejection(reject: reject, message: "Expected raw data.")
      return
    }

    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.printNormal(data! as String)
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func watermarkPrint(
    _ printerId: Double,
    at start: Double,
    withNVImageNumber imageId: Double,
    withPass pass: Double,
    withFeed feed: Double,
    withRepeat reps: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.watermarkPrint(
        Int32(start),
        withNVImageNumber: Int32(imageId),
        withPass: Int32(pass),
        withFeed: Int32(feed),
        withRepeat: Int32(reps)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
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
      let printer = ESCPOSPrinter()
      let result: UnsafeMutablePointer<Int32> = UnsafeMutablePointer<Int32>.allocate(capacity: 1)
      guard
        let printers =
          (printer.searchCitizenPrinter(
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
        self.handleRejection(reject: reject, errorCode: CMP_E_ILLEGAL, printer: printer)
        return
      }

      let exitCode = result.pointee
      guard exitCode == CMP_SUCCESS || exitCode == CMP_E_NO_LIST else {
        self.handleRejection(reject: reject, errorCode: exitCode, printer: printer)
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
      let printer = ESCPOSPrinter()
      let result: UnsafeMutablePointer<Int32> = UnsafeMutablePointer<Int32>.allocate(capacity: 1)
      guard
        let printers =
          (printer.searchESCPOSPrinter(
            Int32(connectType),
            withSearchTime: Int32(time),
            result: result
          ) as? [String])?.sorted(by: { self.ipToNumber($0) < self.ipToNumber($1) })
      else {
        self.handleRejection(reject: reject, errorCode: CMP_E_ILLEGAL, printer: printer)
        return
      }

      let exitCode = result.pointee
      guard exitCode == CMP_SUCCESS || exitCode == CMP_E_NO_LIST else {
        self.handleRejection(reject: reject, errorCode: exitCode, printer: printer)
        return
      }

      resolve(printers)
    }
  }

  @objc
  func printerCheckEx(
    ofType connectType: Double,
    toAddress addr: NSString?,
    withPort port: NSNumber,
    waitFor timeout: NSNumber,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let argType = Int32(connectType)
    let argAddr = addr as String?

    queue.async {
      let printer = ESCPOSPrinter()
      var result = ESCPOSConst.CMP_E_ILLEGAL
      var status = Int32(0)

      switch argType {
      case ESCPOSConst.CMP_PORT_BLUETOOTH, ESCPOSConst.CMP_PORT_WiFi:
        let argPort = Int32(truncating: port)
        let argTimeout = Int32(truncating: timeout)

        switch (argPort, argTimeout) {
        case (let port, let timeout) where port <= 0 && timeout <= 0:
          result = printer.printerCheckEx(
            &status,
            withConnectType: argType,
            withAddrress: argAddr
          )
        case (_, let timeout) where timeout <= 0:
          result = printer.printerCheckEx(
            &status,
            withConnectType: argType,
            withAddrress: argAddr,
            withPort: argPort
          )
        default:
          result = printer.printerCheckEx(
            &status,
            withConnectType: argType,
            withAddrress: argAddr,
            withPort: argPort,
            withTimeout: argTimeout
          )
        }
      case ESCPOSConst.CMP_PORT_USB, ESCPOSConst.CMP_PORT_SNMP:
        result = printer.printerCheckEx(
          &status,
          withConnectType: argType,
          withAddrress: argAddr
        )
      default:
        result = ESCPOSConst.CMP_E_ILLEGAL
      }

      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(status)
    }
  }

  @objc
  func openDrawerEx(
    at drawer: Double,
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
      let printer = ESCPOSPrinter()
      var result = ESCPOSConst.CMP_E_ILLEGAL

      switch argType {
      case ESCPOSConst.CMP_PORT_BLUETOOTH, ESCPOSConst.CMP_PORT_WiFi:
        let argPort = Int32(truncating: port)
        let argTimeout = Int32(truncating: timeout)

        switch (argPort, argTimeout) {
        case (let port, let timeout) where port <= 0 && timeout <= 0:
          result = printer.openDrawerEx(
            argDrawer,
            withPulseLength: argPulseLength,
            withConnectType: argType,
            withAddrress: argAddr
          )
        case (_, let timeout) where timeout <= 0:
          result = printer.openDrawerEx(
            argDrawer,
            withPulseLength: argPulseLength,
            withConnectType: argType,
            withAddrress: argAddr,
            withPort: argPort
          )
        default:
          result = printer.openDrawerEx(
            argDrawer,
            withPulseLength: argPulseLength,
            withConnectType: argType,
            withAddrress: argAddr,
            withPort: argPort,
            withTimeout: argTimeout
          )
        }
      case ESCPOSConst.CMP_PORT_USB, ESCPOSConst.CMP_PORT_SNMP:
        result = printer.openDrawerEx(
          argDrawer,
          withPulseLength: argPulseLength,
          withConnectType: argType,
          withAddrress: argAddr
        )
      default:
        result = ESCPOSConst.CMP_E_ILLEGAL
      }

      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func setPrintCompletedTimeout(
    _ printerId: Double,
    to timeout: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.setPrintCompletedTimeout(Int32(timeout))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func setLog(
    _ printerId: Double,
    toMode mode: Double,
    withPath path: String,
    limitTo size: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.setLog(
        Int32(mode),
        withPath: path,
        withMaxSize: Int32(size)
      )
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
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
    resolve(ESCPOSPrinter().getVersionCode())
  }

  @objc
  func getVersionName(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    resolve(ESCPOSPrinter().getVersionName())
  }

  @objc
  func getPageModeArea(
    _ printerId: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      resolve(printer.getPageModeArea())
    }
  }

  @objc
  func getPageModePrintArea(
    _ printerId: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      resolve(printer.getPageModePrintArea())
    }
  }

  @objc
  func getPageModePrintDirection(
    _ printerId: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      resolve(printer.getPageModePrintDirection())
    }
  }

  @objc
  func setPageModePrintDirection(
    _ printerId: Double,
    to direction: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.setPageModePrintDirection(Int32(direction))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func getPageModeHorizontalPosition(
    _ printerId: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      resolve(printer.getPageModeHorizontalPosition())
    }
  }

  @objc
  func setPageModeHorizontalPosition(
    _ printerId: Double,
    to position: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.setPageModeHorizontalPosition(Int32(position))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func getPageModeVerticalPosition(
    _ printerId: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      resolve(printer.getPageModeVerticalPosition())
    }
  }

  @objc
  func setPageModeVerticalPosition(
    _ printerId: Double,
    to position: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.setPageModeVerticalPosition(Int32(position))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func getRecLineSpacing(
    _ printerId: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      resolve(printer.getRecLineSpacing())
    }
  }

  @objc
  func setRecLineSpacing(
    _ printerId: Double,
    to spacing: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.setRecLineSpacing(Int32(spacing))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }

  @objc
  func getMapMode(
    _ printerId: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      resolve(printer.getMapMode())
    }
  }

  @objc
  func setMapMode(
    _ printerId: Double,
    to mode: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    queue.async {
      guard let printer = self.printers[Int(printerId)] else {
        self.handleRejection(reject: reject, message: "Printer not found.")
        return
      }

      let result = printer.setMapMode(Int32(mode))
      guard result == CMP_SUCCESS else {
        self.handleRejection(reject: reject, errorCode: result, printer: printer)
        return
      }

      resolve(nil)
    }
  }
}
