import 'babel-polyfill';
import bridge from 'ng-bridge';
import './dk.scss';

const init = () => {
  bridge.init();
  bridge.setTitle('DK短线宝+简介');
};

init();
