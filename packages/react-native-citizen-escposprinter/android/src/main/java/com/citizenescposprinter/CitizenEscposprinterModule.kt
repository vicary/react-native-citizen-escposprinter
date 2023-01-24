package com.citizenescposprinter

import android.graphics.Typeface
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

  override fun getName(): String {
    return NAME
  }

  protected val coroutineScope: CoroutineScope
    get() {
      val view = getCurrentActivity()?.getCurrentFocus()
      if (view != null) {
        val scope = ViewTreeLifecycleOwner.get(view)?.lifecycleScope
        if (scope != null) {
          return scope
        }
      }

      return GlobalScope
    }

  /** TODO: Look up error messages from code. */
  protected fun handleRejection(promise: Promise, errorCode: Int) {
    promise.reject("ESCPOSPrinter", errorCode.toString())
  }
  protected fun handleRejection(promise: Promise, error: Throwable) {
    promise.reject("ESCPOSPrinter", error)
  }

  @ReactMethod
  override fun connect(
      type: Double,
      address: String,
      port: Double,
      timeout: Double,
      promise: Promise
  ) {
    coroutineScope.launch {
      val ret =
          when (type.toInt()) {
            ESCPOSConst.CMP_PORT_WiFi ->
                if (port > 0)
                    if (timeout > 0)
                        printer.connect(type.toInt(), address, port.toInt(), timeout.toInt())
                    else printer.connect(type.toInt(), address, port.toInt())
                else printer.connect(type.toInt(), address)
            ESCPOSConst.CMP_PORT_Bluetooth, ESCPOSConst.CMP_PORT_Bluetooth_Insecure ->
                printer.connect(type.toInt(), address)
            // ESCPOSConst.CMP_PORT_USB -> printer.connect(connectType, device)
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
      val ret = printer.printText(data, alignment.toInt(), attribute.toInt(), textSize.toInt())

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
      val ret = printer.printQRCode(data, moduleSize.toInt(), ECLevel.toInt(), alignment.toInt())

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
      val printers = printer.searchCitizenPrinter(connectType.toInt(), timeout.toInt(), errorCode)
      val result = Arguments.createArray()

      if (errorCode[0] == ESCPOSConst.CMP_SUCCESS) {
        printers.sortedWith(
            compareBy(String.CASE_INSENSITIVE_ORDER) { it: CitizenPrinterInfo -> it.ipAddress }
                .thenBy(String.CASE_INSENSITIVE_ORDER) { it.macAddress }
                .thenBy(String.CASE_INSENSITIVE_ORDER) { it.deviceName }
                .thenBy(String.CASE_INSENSITIVE_ORDER) { it.bdAddress }
        )

        printers.forEach {
          val map = Arguments.createMap()

          if (!it.ipAddress.isNullOrEmpty()) map.putString("ipAddress", it.ipAddress)
          if (!it.macAddress.isNullOrEmpty()) map.putString("macAddress", it.macAddress)
          if (!it.deviceName.isNullOrEmpty()) map.putString("deviceName", it.deviceName)
          if (!it.bdAddress.isNullOrEmpty()) map.putString("bdAddress", it.bdAddress)

          result.pushMap(map)
        }
      } else if (errorCode[0] != ESCPOSConst.CMP_E_NO_LIST) {
        handleRejection(promise, errorCode[0])
      }

      promise.resolve(result)
    }
  }

  @ReactMethod
  override fun searchESCPOSPrinter(connectType: Double, timeout: Double, promise: Promise) {
    coroutineScope.launch {
      val errorCode = IntArray(1)
      val printers = printer.searchESCPOSPrinter(connectType.toInt(), timeout.toInt(), errorCode)
      val result = ArrayList<String>()

      printers.sort()

      if (errorCode[0] == ESCPOSConst.CMP_SUCCESS) {
        result.addAll(printers)
      } else if (errorCode[0] != ESCPOSConst.CMP_E_NO_LIST) {
        handleRejection(promise, errorCode[0])
      }

      promise.resolve(Arguments.makeNativeArray(result))
    }
  }

  @ReactMethod
  override fun printerCheckEx(
      connectType: Double,
      address: String,
      port: Double?,
      timeout: Double?,
      promise: Promise
  ) {
    coroutineScope.launch {
      val status = IntArray(1)
      val ret =
          when (connectType.toInt()) {
            ESCPOSConst.CMP_PORT_WiFi ->
                if (port != null)
                    if (timeout != null)
                        printer.printerCheckEx(
                            status,
                            connectType.toInt(),
                            address,
                            port.toInt(),
                            timeout.toInt()
                        )
                    else printer.printerCheckEx(status, connectType.toInt(), address, port.toInt())
                else printer.printerCheckEx(status, connectType.toInt(), address)
            ESCPOSConst.CMP_PORT_Bluetooth, ESCPOSConst.CMP_PORT_Bluetooth_Insecure ->
                printer.printerCheckEx(status, connectType.toInt(), address)
            // ESCPOSConst.CMP_PORT_USB -> printer.connect(connectType, device)
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
      port: Double?,
      timeout: Double?,
      promise: Promise
  ) {
    coroutineScope.launch {
      val ret =
          when (connectType.toInt()) {
            ESCPOSConst.CMP_PORT_WiFi ->
                if (port != null)
                    if (timeout != null)
                        printer.openDrawerEx(
                            drawer.toInt(),
                            pulseLen.toInt(),
                            connectType.toInt(),
                            address,
                            port.toInt(),
                            timeout.toInt()
                        )
                    else
                        printer.openDrawerEx(
                            drawer.toInt(),
                            pulseLen.toInt(),
                            connectType.toInt(),
                            address,
                            port.toInt()
                        )
                else
                    printer.openDrawerEx(
                        drawer.toInt(),
                        pulseLen.toInt(),
                        connectType.toInt(),
                        address
                    )
            ESCPOSConst.CMP_PORT_Bluetooth, ESCPOSConst.CMP_PORT_Bluetooth_Insecure ->
                printer.openDrawerEx(drawer.toInt(), pulseLen.toInt(), connectType.toInt(), address)
            // ESCPOSConst.CMP_PORT_USB -> printer.connect(connectType, device)
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
}
