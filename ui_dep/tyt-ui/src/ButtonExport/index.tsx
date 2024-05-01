/**
 * 1. 导出按钮：
 * 2. 导出支持进度条
 * 3. 导出支持弹窗选择输入导出数量
 * 4. 导出支持确认一次，且默认状态需确认提示
 */
import React, { type FC, useState } from 'react';
import { Button, Progress, Modal, InputNumber, message } from 'antd';
import paramsToStr from '../_utils/paramsToStr';
interface InputModal {
  title?: string;
  tips?: string;
  max?: number;
}

// props数据
interface Props {
  inputModal?: InputModal;
  isShowConfirm?: boolean; // 是否出现确认 默认为true
  export_api?: string; // 请求资源定位
  params?: any; // 额外的请求参数
  btnName?: any; // 导出按钮名称
  exportSuccess?: Function; // 导出成功回调
  buttonAttrs?: any; // 可传递给内部button
  disabled?: boolean; // 是否禁用
}

const ButtonExport = (props: Props | any)=> {
  const {
    inputModal, 
    isShowConfirm = true, 
    export_api='', 
    params={}, 
    btnName='导出', 
    exportSuccess, 
    buttonAttrs={}, 
    disabled=false
  } = props
  const [exportNum, setExportNum] = useState(1)
  const [percent, setPercent] = useState(0)
  const [isShowProgress, setIsShowProgress] = useState(false)
  const [inputIsShow, setInputIsShow] = useState(false)
  const [host, setHost] = useState('//bizsystem.zhuanspirit.com/')

  const exportData = (export_num ?: number) => {
    console.log("exportData:", export_num)
    if(typeof window != 'undefined' && window.EventSource) {
      const paramsReq = export_num ? Object.assign(params, { exportNum: export_num }) : params
      const eventSource = new EventSource(`${host}${export_api}${Object.keys(paramsReq).length ? '?' : ''}${paramsToStr(paramsReq)}`, {
        withCredentials: true
      })
      setIsShowProgress(true)
      eventSource.addEventListener('running', (res: any) => {
        const data = JSON.parse(res.data)
        setPercent(data.percent)
      })

      eventSource.addEventListener('complete', (res: any) => {
        const data = JSON.parse(res.data)
        setIsShowProgress(false)
        eventSource.close()
        window.open(`${host}commonexport/export?key=${data.fileKey}`)
        exportSuccess && exportSuccess()
      })

      eventSource.addEventListener('error', (res: any) => {
        eventSource.close()
        const data = res.data && JSON.parse(res.data);
        message.error(data ? data.errorMsg || data.msg : '服务异常，请稍后再试');
        setIsShowProgress(false)
      })
    } else {
      message.warning('您的浏览器暂不支持该功能，请换chrome重试一下～～')
    }
  }
  const showConfirm = () => {
    return new Promise((resolve: any, reject) => {
      Modal.confirm({
        title: '导出',
        content:
          '将为您导出所有查询结果，若未进行筛选，则导出列表中所有数据，数据量过大时，导出时间会需要几分钟，确认导出吗？',
        cancelText: '取消',
        okText: '确定',
        onOk() {
          resolve();
        },
        onCancel() {
          reject();
        },
      })
    })
  }
  const isConfirmExport = () => {
    if(isShowConfirm) {
      showConfirm().then(() => {
        exportData()
      })
    } else {
      exportData()
    }
  }
  const getExportType = () => {
    if(inputModal) {
      setInputIsShow(true)
      return
    }
    isConfirmExport()
  }
  const conInputHandle = () => {
    inputIsHidden()
    exportData(exportNum)
  }
  const inputIsHidden = () => {
    setInputIsShow(false)
  }
  const onInputChange = (value: number) => {
    setExportNum(value)
  }
  const renderInputParamsModal = () => {
    const {title, tips, max} = inputModal
    return <Modal
    title={title || '请输入下载发布结果码数量'}
    open
    onOk={conInputHandle}
    onCancel={inputIsHidden}
    >
      <InputNumber min={1} max={max || 10000} value={exportNum} onChange={onInputChange} />
      <div>{tips || '请输入小于等于10000的数字'}</div>
    </Modal>
  }

  return (
    <span>
      <Button 
        type='primary'
        {...buttonAttrs}
        disabled={disabled}
        onClick={() => getExportType()}
      >
        {props.children || buttonAttrs && buttonAttrs.name || btnName }
      </Button>
      {isShowProgress && <Progress percent={percent} size="small" />}
      {inputIsShow && renderInputParamsModal()}
    </span>
  )
}

export default ButtonExport;
