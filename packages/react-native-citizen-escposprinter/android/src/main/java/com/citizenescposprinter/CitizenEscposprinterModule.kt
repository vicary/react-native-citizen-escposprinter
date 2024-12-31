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
import java.util.concurrent.atomic.AtomicInteger
import java.util.concurrent.ConcurrentHashMap

class CitizenEscposprinterModule internal constructor(val context: ReactApplicationContext) :
  CitizenEscposprinterSpec(context) {

  private val printersId = AtomicInteger(0)
  private val printers = ConcurrentHashMap<Int, ESCPOSPrinter>()

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

  protected fun handleRejection(
    promise: Promise,
    errorCode: Int,
    printer: ESCPOSPrinter
  ) {
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
      val printer = ESCPOSPrinter().apply {
        setContext(context)
      }
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
        val id = printersId.incrementAndGet()

        printers.set(id, printer)
        promise.resolve(id)
      } else {
        handleRejection(promise, ret, printer)
      }
    }
  }

  @ReactMethod
  override fun disconnect(id: Double, promise: Promise) {
    coroutineScope.launch {
      val intId = id.toInt()

      printers.get(intId)?.let {
        val ret = it.disconnect()

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          printers.remove(intId)
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun setEncoding(id: Double, encoding: String, promise: Promise) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.setEncoding(encoding)

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun printerCheck(id: Double, promise: Promise) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.printerCheck()

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun status(id: Double, type: Double, promise: Promise) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val status = if (type > 0) it.status(type.toInt()) else it.status()

        promise.resolve(status)
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun printText(
    id: Double,
    data: String,
    alignment: Double,
    attribute: Double,
    textSize: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret =
          it.printText(
            data,
            alignment.toInt(),
            attribute.toInt(),
            textSize.toInt()
          )

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun printPaddingText(
    id: Double,
    data: String,
    attribute: Double,
    textSize: Double,
    length: Double,
    side: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret =
          it.printPaddingText(
            data,
            attribute.toInt(),
            textSize.toInt(),
            length.toInt(),
            side.toInt()
          )

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun printTextLocalFont(
    id: Double,
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
        printers.get(id.toInt())?.let {
          val ret =
            it.printTextLocalFont(
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

            handleRejection(promise, ret, it)
          }
        } ?: promise.reject("ESCPOSPrinter", "Printer not found")
      }
    }
  }

  @ReactMethod
  override fun printBitmap(
    id: Double,
    data: String,
    width: Double,
    alignment: Double,
    mode: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      try {
        var argWidth = width.toInt()
        var argAlignment = alignment.toInt()
        var argMode = mode.toInt()
        val bytes = Base64.decode(data, Base64.DEFAULT)
        val ret: Int

        printers.get(id.toInt())?.let {
          if (mode > 0) {
            ret = it.printBitmap(bytes, argWidth, argAlignment, argMode)
          } else {
            ret = it.printBitmap(bytes, argWidth, argAlignment)
          }

          if (ret == ESCPOSConst.CMP_SUCCESS) {
            promise.resolve(null)
          } else {
            handleRejection(promise, ret, it)
          }
        } ?: promise.reject("ESCPOSPrinter", "Printer not found")
      } catch (e: Throwable) {
        handleRejection(promise, e)
      }
    }
  }

  @ReactMethod
  override fun printBarCode(
    id: Double,
    data: String,
    symbology: Double,
    height: Double,
    width: Double,
    alignment: Double,
    textPosition: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret =
          it.printBarCode(
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
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun printPDF417(
    id: Double,
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
      printers.get(id.toInt())?.let {
        val ret =
          it.printPDF417(
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
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun printQRCode(
    id: Double,
    data: String,
    moduleSize: Double,
    ECLevel: Double,
    alignment: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret =
          it.printQRCode(
            data,
            moduleSize.toInt(),
            ECLevel.toInt(),
            alignment.toInt()
          )

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun printGS1DataBarStacked(
    id: Double,
    data: String,
    symbology: Double,
    moduleSize: Double,
    maxSize: Double,
    alignment: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret =
          it.printGS1DataBarStacked(
            data,
            symbology.toInt(),
            moduleSize.toInt(),
            maxSize.toInt(),
            alignment.toInt()
          )

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun cutPaper(id: Double, type: Double, promise: Promise) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.cutPaper(type.toInt())

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun unitFeed(id: Double, ufCount: Double, promise: Promise) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.unitFeed(ufCount.toInt())

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun markFeed(id: Double, type: Double, promise: Promise) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.markFeed(type.toInt())

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun openDrawer(
    id: Double,
    drawer: Double,
    pulseLen: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.openDrawer(drawer.toInt(), pulseLen.toInt())

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun transactionPrint(id: Double, control: Double, promise: Promise) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.transactionPrint(control.toInt())

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun rotatePrint(id: Double, rotation: Double, promise: Promise) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.rotatePrint(rotation.toInt())

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun pageModePrint(id: Double, control: Double, promise: Promise) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.pageModePrint(control.toInt())

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun clearPrintArea(id: Double, promise: Promise) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.clearPrintArea()

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun clearOutput(id: Double, promise: Promise) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.clearOutput()

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun printData(id: Double, data: String, promise: Promise) {
    coroutineScope.launch {
      val bytes = Base64.decode(data, Base64.DEFAULT)

      printers.get(id.toInt())?.let {
        val ret = it.printData(bytes)

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun printNormal(id: Double, data: String, promise: Promise) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.printNormal(data)

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun watermarkPrint(
    id: Double,
    start: Double,
    nvImageNumber: Double,
    pass: Double,
    feed: Double,
    repeat: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret =
          it.watermarkPrint(
            start.toInt(),
            nvImageNumber.toInt(),
            pass.toInt(),
            feed.toInt(),
            repeat.toInt()
          )

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun printNVBitmap(
    id: Double,
    nvImageNumber: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.printNVBitmap(nvImageNumber.toInt())

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun searchCitizenPrinter(connectType: Double, timeout: Double, promise: Promise) {
    coroutineScope.launch {
      val errorCode = IntArray(1)
      val printer = ESCPOSPrinter().apply { setContext(context) }
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
        errorCode[0] != ESCPOSConst.CMP_SUCCESS &&
        errorCode[0] != ESCPOSConst.CMP_E_NO_LIST
      ) {
        handleRejection(promise, errorCode[0], printer)
      } else {
        promise.resolve(Arguments.makeNativeArray(printers))
      }
    }
  }

  @ReactMethod
  override fun searchESCPOSPrinter(connectType: Double, timeout: Double, promise: Promise) {
    coroutineScope.launch {
      val errorCode = IntArray(1)
      val printer = ESCPOSPrinter().apply { setContext(context) }
      val printers =
        printer
          .searchESCPOSPrinter(connectType.toInt(), timeout.toInt(), errorCode)
          .sortedBy { ipToNumber(it) }
          .toList()

      if (
        errorCode[0] != ESCPOSConst.CMP_SUCCESS &&
        errorCode[0] != ESCPOSConst.CMP_E_NO_LIST
      ) {
        handleRejection(promise, errorCode[0], printer)
      } else {
        promise.resolve(Arguments.makeNativeArray(printers))
      }
    }
  }

  @ReactMethod
  override fun printerCheckEx(
    id: Double,
    connectType: Double,
    address: String,
    port: Double,
    timeout: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val intType = connectType.toInt()
        val status = IntArray(1)
        val ret =
          when (intType) {
            ESCPOSConst.CMP_PORT_WiFi -> {
              val intPort = port.toInt()
              val intTimeout = timeout.toInt()

              when {
                intPort > 0 && intTimeout > 0 ->
                  it.printerCheckEx(
                    status,
                    intType,
                    address,
                    intPort,
                    intTimeout
                  )
                intPort > 0 ->
                  it.printerCheckEx(
                    status,
                    intType,
                    address,
                    intPort
                  )
                else ->
                  it.printerCheckEx(
                    status,
                    intType,
                    address
                  )
              }
            }
            ESCPOSConst.CMP_PORT_Bluetooth,
            ESCPOSConst.CMP_PORT_Bluetooth_Insecure ->
              it.printerCheckEx(status, intType, address)
            ESCPOSConst.CMP_PORT_USB -> {
              val device: UsbDevice? = null
              it.printerCheckEx(status, intType, device)
            }
            else -> ESCPOSConst.CMP_E_ILLEGAL
          }

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(status[0])
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun openDrawerEx(
    id: Double,
    drawer: Double,
    pulseLen: Double,
    connectType: Double,
    address: String,
    port: Double,
    timeout: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val intType = connectType.toInt()
        val intDrawer = drawer.toInt()
        val intPulseLen = pulseLen.toInt()
        val ret = when (intType) {
          ESCPOSConst.CMP_PORT_WiFi -> {
            val intPort = port.toInt()
            val intTimeout = timeout.toInt()

            when {
              intPort > 0 && intTimeout > 0 ->
                it.openDrawerEx(
                  intDrawer,
                  intPulseLen,
                  intType,
                  address,
                  intPort,
                  intTimeout
                )
              intPort > 0 ->
                it.openDrawerEx(
                  intDrawer,
                  intPulseLen,
                  intType,
                  address,
                  intPort
                )
              else ->
                it.openDrawerEx(
                  intDrawer,
                  intPulseLen,
                  intType,
                  address
                )
            }
          }
          ESCPOSConst.CMP_PORT_Bluetooth,
          ESCPOSConst.CMP_PORT_Bluetooth_Insecure ->
            it.openDrawerEx(
              intDrawer,
              intPulseLen,
              intType,
              address
            )
          ESCPOSConst.CMP_PORT_USB -> {
            val device: UsbDevice? = null
            it.openDrawerEx(
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
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun setPrintCompletedTimeout(
    id: Double,
    timeout: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.setPrintCompletedTimeout(timeout.toInt())

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun setLog(
    id: Double,
    mode: Double,
    path: String,
    maxSize: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        it.setLog(mode.toInt(), path, maxSize.toInt())
        promise.resolve(null)
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun getVersionCode(promise: Promise) {
    val versionCode = ESCPOSPrinter().apply {
      setContext(context)
      getVersionCode()
    }

    promise.resolve(versionCode)
  }

  @ReactMethod
  override fun getVersionName(promise: Promise) {
    val versionName = ESCPOSPrinter().apply {
      setContext(context)
      getVersionName()
    }

    promise.resolve(versionName)
  }

  @ReactMethod
  override fun getPageModeArea(id: Double, promise: Promise) {
    printers.get(id.toInt())?.let {
      val area = it.getPageModeArea()
      promise.resolve(area)
    } ?: promise.reject("ESCPOSPrinter", "Printer not found")
  }

  @ReactMethod
  override fun getPageModePrintArea(id: Double, promise: Promise) {
    printers.get(id.toInt())?.let {
      val area = it.getPageModePrintArea()
      promise.resolve(area)
    } ?: promise.reject("ESCPOSPrinter", "Printer not found")
  }

  @ReactMethod
  override fun setPageModePrintArea(id: Double, area: String, promise: Promise) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.setPageModePrintArea(area)

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun getPageModePrintDirection(id: Double, promise: Promise) {
    printers.get(id.toInt())?.let {
      val direction = it.getPageModePrintDirection()
      promise.resolve(direction)
    } ?: promise.reject("ESCPOSPrinter", "Printer not found")
  }

  @ReactMethod
  override fun setPageModePrintDirection(
    id: Double,
    direction: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.setPageModePrintDirection(direction.toInt())

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun getPageModeHorizontalPosition(id: Double, promise: Promise) {
    printers.get(id.toInt())?.let {
      val position = it.getPageModeHorizontalPosition()
      promise.resolve(position)
    } ?: promise.reject("ESCPOSPrinter", "Printer not found")
  }

  @ReactMethod
  override fun setPageModeHorizontalPosition(
    id: Double,
    position: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.setPageModeHorizontalPosition(position.toInt())

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun getPageModeVerticalPosition(id: Double, promise: Promise) {
    printers.get(id.toInt())?.let {
      val position = it.getPageModeVerticalPosition()
      promise.resolve(position)
    } ?: promise.reject("ESCPOSPrinter", "Printer not found")
  }

  @ReactMethod
  override fun setPageModeVerticalPosition(
    id: Double,
    position: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.setPageModeVerticalPosition(position.toInt())

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun getRecLineSpacing(id: Double, promise: Promise) {
    printers.get(id.toInt())?.let {
      val spacing = it.getRecLineSpacing()
      promise.resolve(spacing)
    } ?: promise.reject("ESCPOSPrinter", "Printer not found")
  }

  @ReactMethod
  override fun setRecLineSpacing(
    id: Double,
    spacing: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.setRecLineSpacing(spacing.toInt())

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }

  @ReactMethod
  override fun getMapMode(id: Double, promise: Promise) {
    printers.get(id.toInt())?.let {
      val mode = it.getMapMode()
      promise.resolve(mode)
    } ?: promise.reject("ESCPOSPrinter", "Printer not found")
  }

  @ReactMethod
  override fun setMapMode(id: Double, mode: Double, promise: Promise) {
    coroutineScope.launch {
      printers.get(id.toInt())?.let {
        val ret = it.setMapMode(mode.toInt())

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret, it)
        }
      } ?: promise.reject("ESCPOSPrinter", "Printer not found")
    }
  }
}
