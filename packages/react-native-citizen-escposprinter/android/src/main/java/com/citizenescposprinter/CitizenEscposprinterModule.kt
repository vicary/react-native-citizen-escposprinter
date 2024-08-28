package com.citizenescposprinter

import android.graphics.Typeface
import android.hardware.usb.UsbDevice
import android.util.Base64
import androidx.lifecycle.ViewTreeLifecycleOwner
import androidx.lifecycle.lifecycleScope
import com.citizen.sdk.CitizenPrinterInfo
import com.citizen.sdk.ESCPOSConst
import com.citizen.sdk.ESCPOSPrinter
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import kotlin.comparisons.compareBy
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

class CitizenEscposprinterModule internal constructor(context: ReactApplicationContext) :
  CitizenEscposprinterSpec(context) {

  val printer = ESCPOSPrinter()

  init {
    printer.setContext(context)
  }

  companion object {
    const val NAME = "CitizenEscposprinter"
  }

  override fun getName(): String = NAME

  protected val coroutineScope: CoroutineScope
    get() =
      getCurrentActivity()
        ?.getCurrentFocus()
        ?.let { ViewTreeLifecycleOwner.get(it) }
        ?.lifecycleScope ?: GlobalScope

  protected fun handleRejection(promise: Promise, errorCode: Int) {
    val errorCodeEx = printer.getErrorCodeExtended()

    if (errorCodeEx > 0) {
      promise.reject("ESCPOSPrinter", errorCodeEx.toString())
    } else {
      promise.reject("ESCPOSPrinter", errorCode.toString())
    }
  }

  protected fun handleRejection(promise: Promise, error: Throwable) {
    promise.reject("ESCPOSPrinter", error)
  }

  protected fun ipToNumber(ip: String): Long =
    ip.split(".").fold(0L) { acc, s -> (acc shl 8) + s.toLong() }

  @ReactMethod
  override fun connect(
    connectType: Double,
    address: String,
    port: Double,
    timeout: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      val intType = connectType.toInt()
      val ret =
        when (intType) {
          ESCPOSConst.CMP_PORT_WiFi -> {
            val intPort = port.toInt()
            val intTimeout = timeout.toInt()

            when {
              intPort > 0 && intTimeout > 0 ->
                printer.connect(intType, address, intPort, intTimeout)
              intPort > 0 ->
                printer.connect(intType, address, intPort)
              else ->
                printer.connect(intType, address)
            }
          }
          ESCPOSConst.CMP_PORT_Bluetooth,
          ESCPOSConst.CMP_PORT_Bluetooth_Insecure ->
            printer.connect(intType, address)
          ESCPOSConst.CMP_PORT_USB -> {
            val device: UsbDevice? = null
            printer.connect(intType, device)
          }
          else -> ESCPOSConst.CMP_E_ILLEGAL
        }

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun disconnect(promise: Promise) {
    coroutineScope.launch {
      val ret = printer.disconnect()

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun setEncoding(encoding: String, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.setEncoding(encoding)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printerCheck(promise: Promise) {
    coroutineScope.launch {
      val ret = printer.printerCheck()

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun status(type: Double, promise: Promise) {
    coroutineScope.launch {
      val status = if (type > 0) printer.status(type.toInt()) else printer.status()

      promise.resolve(status)
    }
  }

  @ReactMethod
  override fun printText(
    data: String,
    alignment: Double,
    attribute: Double,
    textSize: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      val ret =
        printer.printText(data, alignment.toInt(), attribute.toInt(), textSize.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printPaddingText(
    data: String,
    attribute: Double,
    textSize: Double,
    length: Double,
    side: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      val ret =
        printer.printPaddingText(
          data,
          attribute.toInt(),
          textSize.toInt(),
          length.toInt(),
          side.toInt()
        )

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printTextLocalFont(
    data: String,
    alignment: Double,
    fontType: String,
    point: Double,
    style: Double,
    hRatio: Double,
    vRatio: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      val font =
        when (fontType) {
          "DEFAULT" -> Typeface.DEFAULT
          "DEFAULT_BOLD" -> Typeface.DEFAULT_BOLD
          "MONOSPACE" -> Typeface.MONOSPACE
          "SANS_SERIF" -> Typeface.SANS_SERIF
          "SERIF" -> Typeface.SERIF
          else -> null
        }

      if (font != null) {
        val ret =
          printer.printTextLocalFont(
            data,
            alignment.toInt(),
            font,
            point.toInt(),
            style.toInt(),
            hRatio.toInt(),
            vRatio.toInt()
          )

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {

          handleRejection(promise, ret)
        }
      }
    }
  }

  @ReactMethod
  override fun printBitmap(
    data: String,
    width: Double,
    alignment: Double,
    mode: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      try {

        val bytes = Base64.decode(data, Base64.DEFAULT)
        val ret: Int

        if (mode > 0) {
          ret = printer.printBitmap(bytes, width.toInt(), alignment.toInt(), mode.toInt())
        } else {
          ret = printer.printBitmap(bytes, width.toInt(), alignment.toInt())
        }

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret)
        }
      } catch (e: Throwable) {
        handleRejection(promise, e)
      }
    }
  }

  @ReactMethod
  override fun printBarCode(
    data: String,
    symbology: Double,
    height: Double,
    width: Double,
    alignment: Double,
    textPosition: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      val ret =
        printer.printBarCode(
          data,
          symbology.toInt(),
          height.toInt(),
          width.toInt(),
          alignment.toInt(),
          textPosition.toInt()
        )

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printPDF417(
    data: String,
    digits: Double,
    steps: Double,
    moduleWidth: Double,
    stepHeight: Double,
    ECLevel: Double,
    alignment: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      val ret =
        printer.printPDF417(
          data,
          digits.toInt(),
          steps.toInt(),
          moduleWidth.toInt(),
          stepHeight.toInt(),
          ECLevel.toInt(),
          alignment.toInt()
        )

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printQRCode(
    data: String,
    moduleSize: Double,
    ECLevel: Double,
    alignment: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      val ret =
        printer.printQRCode(data, moduleSize.toInt(), ECLevel.toInt(), alignment.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printGS1DataBarStacked(
    data: String,
    symbology: Double,
    moduleSize: Double,
    maxSize: Double,
    alignment: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      val ret =
        printer.printGS1DataBarStacked(
          data,
          symbology.toInt(),
          moduleSize.toInt(),
          maxSize.toInt(),
          alignment.toInt()
        )

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun cutPaper(type: Double, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.cutPaper(type.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun unitFeed(ufCount: Double, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.unitFeed(ufCount.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun markFeed(type: Double, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.markFeed(type.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun openDrawer(drawer: Double, pulseLen: Double, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.openDrawer(drawer.toInt(), pulseLen.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun transactionPrint(control: Double, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.transactionPrint(control.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun rotatePrint(rotation: Double, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.rotatePrint(rotation.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun pageModePrint(control: Double, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.pageModePrint(control.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun clearPrintArea(promise: Promise) {
    coroutineScope.launch {
      val ret = printer.clearPrintArea()

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun clearOutput(promise: Promise) {
    coroutineScope.launch {
      val ret = printer.clearOutput()

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printData(data: String, promise: Promise) {
    coroutineScope.launch {
      val bytes = Base64.decode(data, Base64.DEFAULT)
      val ret = printer.printData(bytes)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printNormal(data: String, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.printNormal(data)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun watermarkPrint(
    start: Double,
    nvImageNumber: Double,
    pass: Double,
    feed: Double,
    repeat: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      val ret =
        printer.watermarkPrint(
          start.toInt(),
          nvImageNumber.toInt(),
          pass.toInt(),
          feed.toInt(),
          repeat.toInt()
        )

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printNVBitmap(nvImageNumber: Double, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.printNVBitmap(nvImageNumber.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun searchCitizenPrinter(connectType: Double, timeout: Double, promise: Promise) {
    coroutineScope.launch {
      val errorCode = IntArray(1)
      val printers =
        printer
          .searchCitizenPrinter(connectType.toInt(), timeout.toInt(), errorCode)
          .sortedWith(
            compareBy { it: CitizenPrinterInfo -> ipToNumber(it.ipAddress) }
              .thenBy(String.CASE_INSENSITIVE_ORDER) { it.macAddress }
              .thenBy(String.CASE_INSENSITIVE_ORDER) { it.deviceName }
              .thenBy(String.CASE_INSENSITIVE_ORDER) { it.bdAddress }
          )
          .map {
            val map = Arguments.createMap()

            if (!it.ipAddress.isNullOrEmpty()) map.putString("ipAddress", it.ipAddress)
            if (!it.macAddress.isNullOrEmpty())
              map.putString("macAddress", it.macAddress)
            if (!it.deviceName.isNullOrEmpty())
              map.putString("deviceName", it.deviceName)
            if (!it.bdAddress.isNullOrEmpty()) map.putString("bdAddress", it.bdAddress)

            map
          }
          .toList()

      if (
        errorCode[0] != ESCPOSConst.CMP_SUCCESS && errorCode[0] != ESCPOSConst.CMP_E_NO_LIST
      ) {
        handleRejection(promise, errorCode[0])
      } else {
        promise.resolve(Arguments.makeNativeArray(printers))
      }
    }
  }

  @ReactMethod
  override fun searchESCPOSPrinter(connectType: Double, timeout: Double, promise: Promise) {
    coroutineScope.launch {
      val errorCode = IntArray(1)
      val printers =
        printer
          .searchESCPOSPrinter(connectType.toInt(), timeout.toInt(), errorCode)
          .sortedBy { ipToNumber(it) }
          .toList()

      if (
        errorCode[0] != ESCPOSConst.CMP_SUCCESS && errorCode[0] != ESCPOSConst.CMP_E_NO_LIST
      ) {
        handleRejection(promise, errorCode[0])
      } else {
        promise.resolve(Arguments.makeNativeArray(printers))
      }
    }
  }

  @ReactMethod
  override fun printerCheckEx(
    connectType: Double,
    address: String,
    port: Double,
    timeout: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      val intType = connectType.toInt()
      val status = IntArray(1)
      val ret =
        when (intType) {
          ESCPOSConst.CMP_PORT_WiFi -> {
            val intPort = port.toInt()
            val intTimeout = timeout.toInt()

            when {
              intPort > 0 && intTimeout > 0 ->
                printer.printerCheckEx(
                  status,
                  intType,
                  address,
                  intPort,
                  intTimeout
                )
              intPort > 0 ->
                printer.printerCheckEx(
                  status,
                  intType,
                  address,
                  intPort
                )
              else ->
                printer.printerCheckEx(
                  status,
                  intType,
                  address
                )
            }
          }
          ESCPOSConst.CMP_PORT_Bluetooth,
          ESCPOSConst.CMP_PORT_Bluetooth_Insecure ->
            printer.printerCheckEx(status, intType, address)
          ESCPOSConst.CMP_PORT_USB -> {
            val device: UsbDevice? = null
            printer.printerCheckEx(status, intType, device)
          }
          else -> ESCPOSConst.CMP_E_ILLEGAL
        }

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(status[0])
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun openDrawerEx(
    drawer: Double,
    pulseLen: Double,
    connectType: Double,
    address: String,
    port: Double,
    timeout: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      val intType = connectType.toInt()
      val intDrawer = drawer.toInt()
      val intPulseLen = pulseLen.toInt()
      val ret = when (intType) {
        ESCPOSConst.CMP_PORT_WiFi -> {
          val intPort = port.toInt()
          val intTimeout = timeout.toInt()

          when {
            intPort > 0 && intTimeout > 0 ->
              printer.openDrawerEx(
                intDrawer,
                intPulseLen,
                intType,
                address,
                intPort,
                intTimeout
              )
            intPort > 0 ->
              printer.openDrawerEx(
                intDrawer,
                intPulseLen,
                intType,
                address,
                intPort
              )
            else ->
              printer.openDrawerEx(
                intDrawer,
                intPulseLen,
                intType,
                address
              )
          }
        }
        ESCPOSConst.CMP_PORT_Bluetooth,
        ESCPOSConst.CMP_PORT_Bluetooth_Insecure ->
          printer.openDrawerEx(
            intDrawer,
            intPulseLen,
            intType,
            address
          )
        ESCPOSConst.CMP_PORT_USB -> {
          val device: UsbDevice? = null
          printer.openDrawerEx(
            intDrawer,
            intPulseLen,
            intType,
            device
          )
        }
        else -> ESCPOSConst.CMP_E_ILLEGAL
      }

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun setPrintCompletedTimeout(timeout: Double, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.setPrintCompletedTimeout(timeout.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun setLog(mode: Double, path: String, maxSize: Double, promise: Promise) {
    coroutineScope.launch {
      printer.setLog(mode.toInt(), path, maxSize.toInt())
      promise.resolve(null)
    }
  }

  @ReactMethod
  override fun getVersionCode(promise: Promise) {
    val versionCode = printer.getVersionCode()
    promise.resolve(versionCode)
  }

  @ReactMethod
  override fun getVersionName(promise: Promise) {
    val versionName = printer.getVersionName()
    promise.resolve(versionName)
  }

  @ReactMethod
  override fun getPageModeArea(promise: Promise) {
    val area = printer.getPageModeArea()
    promise.resolve(area)
  }

  @ReactMethod
  override fun getPageModePrintArea(promise: Promise) {
    val area = printer.getPageModePrintArea()
    promise.resolve(area)
  }

  @ReactMethod
  override fun setPageModePrintArea(area: String, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.setPageModePrintArea(area)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun getPageModePrintDirection(promise: Promise) {
    val direction = printer.getPageModePrintDirection()
    promise.resolve(direction)
  }

  @ReactMethod
  override fun setPageModePrintDirection(direction: Double, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.setPageModePrintDirection(direction.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun getPageModeHorizontalPosition(promise: Promise) {
    val position = printer.getPageModeHorizontalPosition()
    promise.resolve(position)
  }

  @ReactMethod
  override fun setPageModeHorizontalPosition(position: Double, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.setPageModeHorizontalPosition(position.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun getPageModeVerticalPosition(promise: Promise) {
    val position = printer.getPageModeVerticalPosition()
    promise.resolve(position)
  }

  @ReactMethod
  override fun setPageModeVerticalPosition(position: Double, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.setPageModeVerticalPosition(position.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun getRecLineSpacing(promise: Promise) {
    val spacing = printer.getRecLineSpacing()
    promise.resolve(spacing)
  }

  @ReactMethod
  override fun setRecLineSpacing(spacing: Double, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.setRecLineSpacing(spacing.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun getMapMode(promise: Promise) {
    val mode = printer.getMapMode()
    promise.resolve(mode)
  }

  @ReactMethod
  override fun setMapMode(mode: Double, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.setMapMode(mode.toInt())

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }
}
