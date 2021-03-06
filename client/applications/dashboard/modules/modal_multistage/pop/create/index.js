import { ModalV2, ModalAlert } from 'ufec';
import { fm } from 'client/libs/fake';
import __ from 'client/locale/dashboard.lang.json';
import config from './config';
import request from '../../request';

function pop(callback) {
  const props = {
    __,
    config,
    onConfirm(values, cb, closeImmediately) {
      const data = {
        name: values.name,
        email: values.email,
        sex: values.sex
      };
      // 判断高级选项是否打开
      if (!values.expand || values.expand.length < 1) {
        data.id = fm.id({ length: 20 })[0];
      } else {
        data.id = values.id;
      }
      ModalAlert({
        __,
        title: ['confirm_create'],
        info: 'sure_create_user',
        btnValue: 'create',
        btnType: 'default',
        onAction: (cb2) => {
          request.createUser(data).then((res) => {
            // 关闭所有级的pop
            closeImmediately();
            // 创建成功后刷新列表
            callback();
          }).catch((err) => {
            // 报错，不关闭pop，显示报错信息
            cb2(false, __.create_user_error);
          });
        }
      });
    },
    onAction(field, value, form, updateFields) {
    }
  };
  ModalV2(props);
}
export default pop;
