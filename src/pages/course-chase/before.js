
import bridge from 'ng-bridge';

import './style.scss';

bridge.setTitle('猎庄追击');

const buybtn1 = document.getElementById('buybtn1');
const buybtn2 = document.getElementById('buybtn2');
const bindbtn = document.getElementById('bindbtn');

buybtn1.onclick = () => {
  bridge.toCoursePayment('4379', '');
};
buybtn2.onclick = () => {
  bridge.toCoursePayment('4379', '');
};
bindbtn.onclick = () => {
  location.href = 'https://h5.niuguwang.com/course/wechat-course/index.html?isbuy=0&4379';
};
