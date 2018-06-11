<template>
  <div class="stock-pool">
    <div class="title">
      <h3>历史股票池</h3>
    </div>
    <div class="nav">
      <span>股票</span>
      <span>入选价格</span>
      <span>当日涨幅</span>
      <span>T+1最高收益</span>
    </div>
    <template v-for="(item, idx) in stockData">
      <div class="content">
        <div class="time">
          {{item.time}}
        </div>
        <template v-for="(itm, ix) in item.lists">
          <div class="stock-data">
            <ul @click="toQuote(itm)">
              <li><span>{{itm.stockname}}</span><span>{{itm.stockcode}}</span></li>
              <li>{{itm.selectedprice}}</li>
              <li :class="className(itm.maxupdownrate)">{{itm.maxupdownrate}}</li>
              <li :class="className(itm.secondmaxupdownrate)">{{itm.secondmaxupdownrate}}</li>
            </ul>
          </div>
        </template>
      </div>
    </template>
    <div class="btn" @click="loadMore" v-show="showloadmore">
      点击加载更多
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui';
  import bridge from 'ng-bridge';
  import API from './../../api/api';

  export default {
    data() {
      return {
        listDate: [],
        listDates: [],
        stockData: [],
        bdyid: 0,
        showHtml: true,
        showloadmore: true,
        utoken: '',
      };
    },
    mounted() {
      bridge.utoken((ut) => {
        this.utoken = ut;
        this.init();
      });
    },
    methods: {
      init() {
        API.history({
          usertoken: this.utoken,
          Order: '-1',
          Size: 3,
          Direction: '-1',
          BoundaryId: this.bdyid,
        }).then((res) => {
          if (res.code === 200) {
            this.bdyid = res.minboundaryid;
            if (res.data.length <= 0) {
              this.showloadmore = false;
            } else {
              this.listDates = this.listDate;
              this.listDate = this.listDates.concat(res.data);
              this.grouping(this.listDate);
              // console.log(this.stockData);
            }
          } else {
            Toast(res.info || '数据错误');
          }
        }, (res) => {
          Toast(res.info || '数据错误');
        });
      },
      // 处理返回数据分日期显示
      grouping(data) {
        const dataList = [];
        const list = data;
        let flag = 0;
        let wdy = {
          time: '',
          lists: '',
        };
        for (let i = 0; i < list.length; i += 1) {
          let az = '';
          for (let j = 0; j < dataList.length; j += 1) {
            if (dataList[j].time === list[i].addtime) {
              flag = 1;
              az = j;
              break;
            }
          }
          if (flag === 1) {
            const ab = dataList[az];
            ab.lists.push(list[i]);
            flag = 0;
          } else if (flag === 0) {
            wdy = {};
            wdy.time = list[i].addtime;
            wdy.lists = [];
            wdy.lists.push(list[i]);
            dataList.push(wdy);
          }
        }
        this.stockData = dataList;
        // console.log(this.stockData);
        if (this.stockData.length < 3) {
          this.showloadmore = false;
        }
      },
      className(sr) {
        const str = String(sr);
        if (str.substr(0, 1) === '+') {
          return 'fontred';
        } else if (str.substr(0, 1) === '-') {
          return 'fontgreen';
        }
        return 'fontgray';
      },
      loadMore() {
        this.init();
      },
      toQuote(item) {
        bridge.toQuote(item.innercode, item.stockcode, item.stockname, item.market);
      },
    },
  };
</script>

