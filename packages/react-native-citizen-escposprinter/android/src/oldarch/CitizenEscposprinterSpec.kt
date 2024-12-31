package com.citizenescposprinter

import com.citizen.sdk.ESCPOSConst
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class CitizenEscposprinterSpec internal constructor(context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {

  abstract fun connect(
    connectType: Double,
    address: String,
    port: Double,
    timeout: Double,
    promise: Promise
  )
  abstract fun disconnect(id: Double, promise: Promise)
  abstract fun setEncoding(id: Double, encoding: String, promise: Promise)
  abstract fun printerCheck(id: Double, promise: Promise)
  abstract fun status(id: Double, type: Double, promise: Promise)
  abstract fun printText(
    id: Double,
    data: String,
    alignment: Double,
    attribute: Double,
    textSize: Double,
    promise: Promise
  )
  abstract fun printPaddingText(
    id: Double,
    data: String,
    attribute: Double,
    textSize: Double,
    length: Double,
    side: Double,
    promise: Promise
  )
  abstract fun printTextLocalFont(
    id: Double,
    data: String,
    alignment: Double,
    fontType: String,
    point: Double,
    style: Double,
    hRatio: Double,
    vRatio: Double,
    promise: Promise
  )
  abstract fun printBitmap(
    id: Double,
    data: String,
    width: Double = ESCPOSConst.CMP_BM_ASIS.toDouble(),
    alignment: Double = ESCPOSConst.CMP_ALIGNMENT_CENTER.toDouble(),
    mode: Double = 0.0,
    promise: Promise
  )
  abstract fun printBarCode(
    id: Double,
    data: String,
    symbology: Double,
    height: Double,
    width: Double,
    alignment: Double,
    textPosition: Double,
    promise: Promise
  )
  abstract fun printPDF417(
    id: Double,
    data: String,
    digits: Double,
    steps: Double,
    moduleWidth: Double,
    stepHeight: Double,
    ECLevel: Double,
    alignment: Double,
    promise: Promise
  )
  abstract fun printQRCode(
    id: Double,
    data: String,
    moduleSize: Double,
    ECLevel: Double,
    alignment: Double,
    promise: Promise
  )
  abstract fun printGS1DataBarStacked(
    id: Double,
    data: String,
    symbology: Double,
    moduleSize: Double,
    maxSize: Double,
    alignment: Double,
    promise: Promise
  )
  abstract fun cutPaper(id: Double, type: Double, promise: Promise)
  abstract fun unitFeed(id: Double, ufCount: Double, promise: Promise)
  abstract fun markFeed(id: Double, type: Double, promise: Promise)
  abstract fun openDrawer(id: Double, drawer: Double, pulseLen: Double, promise: Promise)
  abstract fun transactionPrint(id: Double, control: Double, promise: Promise)
  abstract fun rotatePrint(id: Double, rotation: Double, promise: Promise)
  abstract fun pageModePrint(id: Double, control: Double, promise: Promise)
  abstract fun clearPrintArea(id: Double, promise: Promise)
  abstract fun clearOutput(id: Double, promise: Promise)
  abstract fun printData(id: Double, data: String, promise: Promise)
  abstract fun printNormal(id: Double, data: String, promise: Promise)
  abstract fun watermarkPrint(
    id: Double,
    start: Double,
    nvImageNumber: Double,
    pass: Double,
    feed: Double,
    repeat: Double,
    promise: Promise
  )
  abstract fun printNVBitmap(
    id: Double,
    nvImageNumber: Double,
    promise: Promise
  )
  abstract fun searchCitizenPrinter(
    connectType: Double,
    timeout: Double,
    promise: Promise
  )
  abstract fun searchESCPOSPrinter(
    connectType: Double,
    timeout: Double,
    promise: Promise
  )
  abstract fun printerCheckEx(
    id: Double,
    connectType: Double,
    address: String,
    port: Double,
    timeout: Double,
    promise: Promise
  )
  abstract fun openDrawerEx(
    id: Double,
    drawer: Double,
    pulseLen: Double,
    connectType: Double,
    address: String,
    port: Double,
    timeout: Double,
    promise: Promise
  )
  abstract fun setPrintCompletedTimeout(
    id: Double,
    timeout: Double,
    promise: Promise
  )
  abstract fun setLog(
    id: Double,
    mode: Double,
    path: String,
    maxSize: Double,
    promise: Promise
  )
  abstract fun getVersionCode(promise: Promise)
  abstract fun getVersionName(promise: Promise)
  abstract fun getPageModeArea(
    id: Double,
    promise: Promise
  )
  abstract fun getPageModePrintArea(
    id: Double,
    promise: Promise
  )
  abstract fun setPageModePrintArea(
    id: Double,
    area: String,
    promise: Promise
  )
  abstract fun getPageModePrintDirection(
    id: Double,
    promise: Promise
  )
  abstract fun setPageModePrintDirection(
    id: Double,
    direction: Double,
    promise: Promise
  )
  abstract fun getPageModeHorizontalPosition(
    id: Double,
    promise: Promise
  )
  abstract fun setPageModeHorizontalPosition(
    id: Double,
    position: Double,
    promise: Promise
  )
  abstract fun getPageModeVerticalPosition(
    id: Double,
    promise: Promise
  )
  abstract fun setPageModeVerticalPosition(
    id: Double,
    position: Double,
    promise: Promise
  )
  abstract fun getRecLineSpacing(
    id: Double,
    promise: Promise
  )
  abstract fun setRecLineSpacing(
    id: Double,
    spacing: Double,
    promise: Promise
  )
  abstract fun getMapMode(
    id: Double,
    promise: Promise
  )
  abstract fun setMapMode(
    id: Double,
    mode: Double,
    promise: Promise
  )
}
