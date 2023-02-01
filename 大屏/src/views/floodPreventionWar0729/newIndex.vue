<!--
 * @Description: 大屏-森林防火36比9-战时
 * @Version: 1.0
 * @Autor: SuDe
 * @LastEditors: hehaishen
 * @Date: 2021-06-01 15:40:52
 * @LastEditTime: 2021-06-30 10:16:45
-->
<template>
  <div class="forest-fire"  style="background:#182734">
	  <!-- 天地图 -->
    <div class="show-map">
      <div id="crystalContainer" >
        <div id="envCenterInfo" class="status-bar" style="left: 0px;right: 0px;bottom: 0px;">
          <div id="camera_alt">视点高：NaN米</div>
          <div id="env_alt">海拔：NaN米</div>
          <div id="env_lat">纬度：NaN</div>
          <div id="env_lon">经度：NaN</div>
        </div>
      </div>
    </div>
	  <!-- 头部-开始 -->
	  <Header :title="'全市森林防火一张图'"></Header>
   
	 <!-- 头部-结束 -->
	 <!-- 左侧模块-开始 -->
    <div class="forest-left">
      <div class="forest-left-top">
        <div class="left-top-meteorology">
          <div class="meteorology-title">气象实时信息展示</div>
          <div class="meteorology-show">
            <ul>
              <li>
                <div class="li-content-img">
                  <img
                    src="../../assets/images/forestFire/img_sun.png"
                    alt=""
                  />
                </div>
                <div class="li-content-detail">
                  <p class="li-now-tem">{{temObjShow.nowTem}}</p>
                  <p class="li-about-tem">{{temObjShow.tem}}</p>
                  <p class="li-now-unit">℃</p>
                  <p class="li-now-state">{{temObjShow.weatherDesc}}</p>
                </div>
              </li>
              <li>
                <div class="li-content-logo">
                  <p class="li-img-icon">
                    <img
                      src="../../assets/images/forestFire/img_humidity.png"
                      alt=""
                    />
                  </p>
                  <p class="li-img-text">湿度</p>
                </div>
                <div class="li-content-detail detail-padding">
                  <p>比较湿度</p>
                  <p>{{temObjShow.waterTem}}</p>
                </div>
              </li>
              <li>
                <div class="li-content-logo">
                  <p class="li-img-icon">
                    <img
                      src="../../assets/images/forestFire/img_wind_direction.png"
                      alt=""
                    />
                  </p>
                  <p class="li-img-text">风力风向</p>
                </div>
                <div class="li-content-detail detail-padding">
                  <p>{{temObjShow.windDirection}}</p>
                  <p>{{temObjShow.windStrength}}</p>
                </div>
              </li>
              <li>
                <div class="li-content-logo">
                  <p class="li-img-icon">
                    <img
                      src="../../assets/images/forestFire/img_thunder.png"
                      alt=""
                    />
                  </p>
                  <p class="li-img-text">雷电</p>
                </div>
                <div class="li-content-detail detail-padding" v-show="false">
                  <p>西南风向</p>
                  <p>微风&nbsp;&nbsp;&lt;3级</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="meteorology-chart">
            <div class="meteorology-chart-line"></div>
            <div class="meteorology-chart-line"></div>
          </div>
        </div>

      </div>
      <div class="forset-left-bottom">
        <div class="left-bottom-content">
          <div class="fire-model-title">当前救火物资情况</div>
          <ul class="left-bottom-material">
            <li  v-for="(item,index) in disasterReliefList" :key="index">
              <img
                class="material-img"
                :src="item.url"
                alt=""
              />
              <div class="material-detail">
                <p class="material-detail-type">{{item.materialName}}</p>
                <p class="material-detail-number">{{item.materialNum}}</p>
                <p class="material-detail-unit">{{item.unit}}</p>
              </div>
            </li>
           <!--  <li>
              <img
                class="material-img"
                src="../../assets/images/forestFire/icon_car.png"
                alt=""
              />
              <div class="material-detail">
                <p class="material-detail-type">消防车</p>
                <p class="material-detail-number">36540</p>
                <p class="material-detail-unit">辆</p>
              </div>
            </li>
            <li>
              <img
                class="material-img"
                src="../../assets/images/forestFire/icon_annihilator.png"
                alt=""
              />
              <div class="material-detail">
                <p class="material-detail-type">灭火器</p>
                <p class="material-detail-number">36540</p>
                <p class="material-detail-unit">个</p>
              </div>
            </li>
            <li>
              <img
                class="material-img"
                src="../../assets/images/forestFire/icon_helicopter.png"
                alt=""
              />
              <div class="material-detail">
                <p class="material-detail-type">直升机</p>
                <p class="material-detail-number">36540</p>
                <p class="material-detail-unit">辆</p>
              </div>
            </li>
            <li>
              <img
                class="material-img"
                src="../../assets/images/forestFire/icon_UAV.png"
                alt=""
              />
              <div class="material-detail">
                <p class="material-detail-type">无人机</p>
                <p class="material-detail-number">36540</p>
                <p class="material-detail-unit">个</p>
              </div>
            </li>
            <li>
              <img
                class="material-img"
                src="../../assets/images/forestFire/icon_people.png"
                alt=""
              />
              <div class="material-detail">
                <p class="material-detail-type">防护服</p>
                <p class="material-detail-number">36540</p>
                <p class="material-detail-unit">件</p>
              </div>
            </li>
            <li>
              <img
                      class="material-img"
                      src="../../assets/images/forestFire/icon_spray.png"
                      alt=""
                    />
                    <div class="material-detail">
                      <p class="material-detail-type">喷雾机</p></p>
                      <p class="material-detail-number">36540</p>
                      <p class="material-detail-unit">台</p>
              </div>
            </li>
            <li>
              <img
                      class="material-img"
                      src="../../assets/images/forestFire/icon_satellite_phone.png"
                      alt=""
                    />
                    <div class="material-detail">
                      <p class="material-detail-type">卫星电话</p></p>
                      <p class="material-detail-number">36540</p>
                      <p class="material-detail-unit">台</p>
              </div>
			      </li>
            <li>
              <img
                      class="material-img"
                      src="../../assets/images/forestFire/icon_chain_saw.png"
                      alt=""
                    />
                    <div class="material-detail">
                      <p class="material-detail-type">油锯</p></p>
                      <p class="material-detail-number">36540</p>
                      <p class="material-detail-unit">台</p>
              </div>
			      </li> -->
          </ul>
        </div>
                <div class="left-top-right">
            <div class="wood-fire-spread">
              <div>森林山火蔓延模型预测</div>
            <div>
            <p>启动</p>
			  </div>
          </div>
          <div class="fire-targeting-msg">
            <div class="fire-model-title">靶向短信</div>
		    	<div class="targeting-msg-chose">
				<p v-for="(item, key) in targetingList" :class="[targetingChose===key?'chose-p':'']" :key="key" @click="doChoseTarget(key)">{{item.name}}</p>
				<!-- <p class="chose-p">两公里</p>
				<p>三公里</p> -->
			</div>
			<div class="targeting-msg-chart">
				<div class="msg-chart-wrap1">
					<div class="chart-show-number" v-show="targetingChose===2">1000 </div>
					<div class="msg-chart-wrap2">
						<div class="chart-show-number" v-show="targetingChose===1">600</div>
						<div class="msg-chart-wrap3">
							<div class="chart-show-number" v-show="targetingChose===0">300</div>
						</div>
					</div>
				</div>
			</div>
			<div class="targeting-msg-btn">发送疏散短信</div>
          </div>
        </div>
      </div>
      <div class="forset-left-new">
        <div class="left-bottom-content left-bottom-margin  file-model-all" >
          <div class="fire-model-title">当前救火队伍情况</div>
          
          <div class="fire-list-header">
            <p>队伍名称</p>
            <p>在岗</p>
            <p>请假</p>
            <p>退役</p>
          </div>
         
            <ul class="fire-list-content">
            <vue-seamless-scroll :data="saveFireTeamList" :class-option="defaultOption" >
              <li v-for="(item,index) in saveFireTeamList" :key="index">
                <div @click="fireTeamClick(item,index)">{{item.name}}</div>
                <div>{{item.onDutyNum}}</div>
                <div>{{item.leaveNum}}</div>
                <div>{{item.retireNum}}</div>
              </li>
              <!--  <li>
                <div>救援队伍名称1</div>
                <div>5000</div>
                <div>5000</div>
                <div>5000</div>
              </li>
              <li>
                <div>救援队伍名称1</div>
                <div>5000</div>
                <div>5000</div>
                <div>5000</div>
              </li>
              <li>
                <div>救援队伍名称1</div>
                <div>5000</div>
                <div>5000</div>
                <div>5000</div>
              </li>
              <li>
                <div>救援队伍名称1</div>
                <div>5000</div>
                <div>5000</div>
                <div>5000</div>
              </li>
              <li>
                <div>救援队伍名称1</div>
                <div>5000</div>
                <div>5000</div>
                <div>5000</div>
              </li>
              <li>
                <div>救援队伍名称1</div>
                <div>5000</div>
                <div>5000</div>
                <div>5000</div>
              </li>
              <li>
                <div>救援队伍名称1</div>
                <div>5000</div>
                <div>5000</div>
                <div>5000</div>
              </li>
              <li>
                <div>救援队伍名称1</div>
                <div>5000</div>
                <div>5000</div>
                <div>5000</div>
              </li> -->
              </vue-seamless-scroll>
            </ul>
          
        </div>
        <div class="left-bottom-content file-model-all">
          <div class="fire-model-title">森林火灾专家情况</div>
          <div class="fire-list-header">
            <p>所在单位</p>
            <p>在岗</p>
            <p>请假</p>
            <p>退役</p>
        </div>
		  <ul class="fire-list-content">
        <vue-seamless-scroll :data="nowTeamExpertList" :class-option="defaultOption" >
          <li v-for="(item,index) in nowTeamExpertList" :key="index">
            <div @click="teamExpertClick(item,index)">{{item.name}}</div>
            <div>{{item.onDutyNum}}</div>
            <div>{{item.leaveNum}}</div>
            <div>{{item.retireNum}}</div>
          </li>
        </vue-seamless-scroll>
			  <!-- <li>
				  <div>救援队伍名称1</div>
				  <div>5000</div>
				  <div>5000</div>
				  <div>5000</div>
			  </li>
			  <li>
				  <div>救援队伍名称1</div>
				  <div>5000</div>
				  <div>5000</div>
				  <div>5000</div>
			  </li>
			  <li>
				  <div>救援队伍名称1</div>
				  <div>5000</div>
				  <div>5000</div>
				  <div>5000</div>
			  </li>
			  <li>
				  <div>救援队伍名称1</div>
				  <div>5000</div>
				  <div>5000</div>
				  <div>5000</div>
			  </li>
			  <li>
				  <div>救援队伍名称1</div>
				  <div>5000</div>
				  <div>5000</div>
				  <div>5000</div>
			  </li>
			  <li>
				  <div>救援队伍名称1</div>
				  <div>5000</div>
				  <div>5000</div>
				  <div>5000</div>
			  </li>
			  <li>
				  <div>救援队伍名称1</div>
				  <div>5000</div>
				  <div>5000</div>
				  <div>5000</div>
			  </li>
			  <li>
				  <div>救援队伍名称1</div>
				  <div>5000</div>
				  <div>5000</div>
				  <div>5000</div>
			  </li> -->
		  </ul>
        </div>
      </div>
    </div>
	 <!-- 左侧模块-结束 -->
	 <!-- 火灾统计-开始 -->
	<div class="forest-center" v-if="true">
		<div class="fire-model-title" style="padding-right:120px;">{{eventDatailObj['eventName']}}</div>
		<ul class="forest-center-list">
			<li>
				<div class="center-list-event">
					死亡情况
				</div>
				<div class="center-list-detail">
					<p>
						死亡：<span v-if="yearsStaitcsObj['deathNum']">{{yearsStaitcsObj['deathNum']?yearsStaitcsObj['deathNum']:'0'}}</span>人
					</p>
					<p>
						重伤：<span v-if="yearsStaitcsObj['seriousInjuryNum']">{{yearsStaitcsObj['seriousInjuryNum']?yearsStaitcsObj['seriousInjuryNum']:0}}</span>人
					</p>
					<p>
						损失：<span  v-if="yearsStaitcsObj['minorWoundNum']">{{yearsStaitcsObj['minorWoundNum']?yearsStaitcsObj['minorWoundNum']:'0'}}</span>
					</p>
				</div>
			</li>
			<li>
				<div class="center-list-event">
					救援队伍
				</div>
				<div class="center-list-detail">
					<p >
						现场救援队伍: <span  v-if="yearsStaitcsObj['rescueTeamList'].length">{{yearsStaitcsObj['rescueTeamList'][0]['ranksNum']?yearsStaitcsObj['rescueTeamList'][0]['ranksNum']:0}}</span>支，
                        共<span v-if="yearsStaitcsObj['rescueTeamList'].length">{{yearsStaitcsObj['rescueTeamList'][0]['peopleNum']?yearsStaitcsObj['rescueTeamList'][0]['peopleNum']:0}}</span>人
					</p>
					<p>
						在途救援队伍:  <span  v-if="yearsStaitcsObj['rescueTeamList'].length">{{yearsStaitcsObj['rescueTeamList'][1]['ranksNum']?yearsStaitcsObj['rescueTeamList'][1]['ranksNum']:0}}</span>支，
                        共<span v-if="yearsStaitcsObj['rescueTeamList'].length">{{yearsStaitcsObj['rescueTeamList'][1]['peopleNum']?yearsStaitcsObj['rescueTeamList'][1]['peopleNum']:0}}</span>人
					</p>
				</div>
			</li>
			<li>
				<div class="center-list-event">
					救援物资
				</div>
				<div class="center-list-detail">
					<p>
						现场救援队伍: <label v-if="yearsStaitcsObj && yearsStaitcsObj.sceneReliefMaterialsList" v-for="(item,index) in yearsStaitcsObj.sceneReliefMaterialsList" :key="index" v-show="index<2">{{item.materialName}}:<span>{{item.materialNum}}</span>{{item.unit}},</label>
					</p>
					<p>
						在途救援队伍:  <label v-if="yearsStaitcsObj && yearsStaitcsObj.waitReliefMaterialsList" v-for="(item,index) in yearsStaitcsObj.waitReliefMaterialsList" :key="index" v-show="index<2">{{item.materialName}}:<span>{{item.materialNum}}</span>{{item.unit}},</label>
					</p>
				</div>
			</li>
			<li>
				<div class="center-list-event">
					所需物资
				</div>
				<div class="center-list-detail">
					<!-- <p>
						死亡: <span>1</span>人
					</p>
					<p>
						重伤: <span>5</span>人
					</p>
					<p>
						损失：<span>1200W</span>
					</p> -->
				</div>
			</li>
			<li>
			<!-- 	<div class="center-list-event">
					2.13增城区**生大火灾
				</div>
				<div class="center-list-detail">
					<p>
						死亡: <span>1</span>人
					</p>
					<p>
						重伤: <span>5</span>人
					</p>
					<p>
						损失：<span>1200W</span>
					</p>
				</div> -->
			</li>
		</ul>
	</div>
	<!-- 火灾统计-结束 -->
  <!-- 右侧模块-开始 -->
  <div class="forest-right">

		<div class="forest-right-right">
			<div  class="right-left-water">
				<!-- <div class="fire-model-title">领导下达救援指令</div> -->
        <div class="fire-model-title">领导指令及反馈</div>
        <div class="right-right-order" v-if="false">
          <ul v-if="false">
            <li v-for="(item,index) in orderList" :key="index" v-show="index<7">
              <div>{{item.commandDetail}}</div>
              <div>{{item.commandTime.slice(-10)}}</div>
            </li>
          </ul>
        </div>
        <div class="right-right-content">
          <ul v-if="orderList.length">
            <li v-for="(item, index) in orderList" :key="index">
              <div class="li-event-title">
                <p>
                  <img :src="item.iconUrl" alt="" />
                  <span>{{ item.position }}</span>
                  <span>{{ item.commanderName }}</span>
                  <span>{{ item.created.slice(8, 10) }}日</span>
                  <span>{{
                    item.created.slice(11, item.created.length)
                  }}</span>
                </p>
                <label :class="[item.type === '1' ? 'green' : 'blue']" for="">{{
                  item.commandTheme
                }}</label>
              </div>
              <div
                v-if="item.commandDetail"
                class="li-event-detail"
                :class="[item.type === '1' ? 'bg-task' : 'bg-trouble']"
              >
                {{ item.commandDetail }}
                <div  v-if="item.feedBackList && item.feedBackList.length" v-for="(fItem,fk) in item.feedBackList" style="margin-top:10px;">
                  <p>{{fItem.feedbackTime}}</p>
                  <p><label>{{fItem.feedbackerNickName}}:</label><span>{{fItem.feedbackerinfo}}</span></p>
                </div>
              </div>
              <img
                class="li-icon-task"
                src="../../assets/images/dragonBoat/icon_tast_li.png"
                alt=""
              />
            </li>
          </ul>
        </div>
			</div>
      		<div class="forest-right-left">
			<div class="right-left-connection2">
				<div class="fire-model-title">物联点数据实时展示</div>
				<div class="connection2-tab">
					<p  v-for="(item, index) in connectionLabList" @click="doTabActive(index)" :class="[tabActive===index?'active-tab':'']" :key="index">{{item.name}}</p>
				</div>
				<div class="left-connection2-wrap">
					<ul>
						<li>
              <video src="../../assets/media/nua.mp4" muted autoplay loop style="height:100%;width:100%;"></video>
            </li>
						<li> <video src="../../assets/media/nua.mp4" muted autoplay loop style="height:100%;width:100%;"></video></li>
						<li> <video src="../../assets/media/nua.mp4" muted autoplay loop style="width:100%;height:100%;"></video></li>
					</ul>
				</div>
			</div>
			<div class="right-left-connection2">
				<div class="fire-model-title">火场附近坡形坡地</div>
				<div class="slope-chart" style="width:100%;height:100%;">
				
				</div>
			</div>
			<div class="right-left-uav2">
				<div class="fire-model-title">无人机视频</div>
				<div class="uav-list-wrap">
					<ul class="left-uav-list">
						<li>
							<div>
                 <video src="../../assets/media/nua.mp4" muted autoplay loop style="height:100%;width:100%;"></video>
              </div>
						</li>
						<li>
							<div>
                 <video src="../../assets/media/nua.mp4" muted autoplay loop style="height:100%;width:100%;"></video>
              </div>
						</li>
						<li>
							<div></div>
						</li>
						<li>
							<div></div>
						</li>
					</ul>
				</div>
				
				<div class="left-uav-title">监控点视频</div>
				<div class="uav-list-wrap">
					<ul class="left-uav-list">
						<li>
							<div>
                 <video src="../../assets/media/nua.mp4" muted autoplay loop style="height:100%;width:100%;"></video>
              </div>
						</li>
						<li>
							<div>
                 <video src="../../assets/media/nua.mp4" muted autoplay loop style="height:100%;width:100%;"></video>
              </div>
						</li>
						<li>
							<div></div>
						</li>
						<li>
							<div></div>
						</li>
					</ul>
					<ul class="left-uav-list">
						<li>
							<div></div>
						</li>
						<li>
							<div></div>
						</li>
						<li>
							<div></div>
						</li>
						<li>
							<div></div>
						</li>
					</ul>
				</div>
			</div>
		</div>


		<!-- 	<div class="right-left-fire">
				<div class="fire-model-title">救援现场问题反馈</div>
         <div class="right-right-order">
            <ul v-if="false">
             <li v-for="(item,index) in orderList" :key="index">{{}}</li>
            </ul>
         </div>
			</div> -->
		</div>
	</div>
   <!-- 右侧模块-结束 -->
	<!-- 植被信息-开始 -->
	<div class="forest-message" v-if="false">
		<div class="forest-vegetation" :style="vegetationShow?vegetationShowObj:vegetationHiddenObj">
			<div class="forest-vegetation-hidden" v-if="!vegetationShow">
				<p class="vegetation-title-center">全市植被统计</p>
				<p class="vegetation-title-open" @click="toShowVegetation('vegetationShow')">▲</p>
			</div>
			<div class="forest-vegetation-title" v-if="vegetationShow">
				<p class="vegetation-title-icon"></p>
				<p class="vegetation-title-text">全市植被统计</p>
				<p class="vegetation-title-close" @click="toHiddenVegetation('vegetationShow')">X</p>
			</div>
			<div class="forest-vegetation-statices">
				<p>全市珍惜植被共计:<span>1023</span>亩</p>
				<p>被烧珍惜植被共计:<span>236</span>亩</p>
			</div>
			<ul class="forest-vegetation-list">
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
			</ul>
		</div>
		<div class="forest-vegetation" :style="checkVegetationInfo?vegetationShowObj:vegetationHiddenObj">
			<div class="forest-vegetation-hidden" v-if="!checkVegetationInfo">
				<p class="vegetation-title-center">查看植被信息</p>
				<p class="vegetation-title-open" @click="toShowVegetation('checkVegetationInfo')">▲</p>
			</div>
			<div class="forest-vegetation-title" v-if="checkVegetationInfo">
				<p class="vegetation-title-icon"></p>
				<p class="vegetation-title-text">查看植被信息</p>
				<p class="vegetation-title-close" @click="toHiddenVegetation('checkVegetationInfo')">X</p>
			</div>
			<div class="forest-vegetation-statices">
				<p>全市珍惜植被共计:<span>1023</span>亩</p>
				<p>被烧珍惜植被共计:<span>236</span>亩</p>
			</div>
			<ul class="forest-vegetation-list">
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
			</ul>
		</div>
		<div class="forest-vegetation" :style="waterInfo?vegetationShowObj:vegetationHiddenObj">
			<div class="forest-vegetation-hidden" v-if="!waterInfo">
				<p class="vegetation-title-center">水源信息</p>
				<p class="vegetation-title-open" @click="toShowVegetation('waterInfo')">▲</p>
			</div>
			<div class="forest-vegetation-title" v-if="waterInfo">
				<p class="vegetation-title-icon"></p>
				<p class="vegetation-title-text">水源信息</p>
				<p class="vegetation-title-close" @click="toHiddenVegetation('waterInfo')">X</p>
			</div>
			<div class="forest-vegetation-statices">
				<p>全市珍惜植被共计:<span>1023</span>亩</p>
				<p>被烧珍惜植被共计:<span>236</span>亩</p>
			</div>
			<ul class="forest-vegetation-list">
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
			</ul>
		</div>
	</div>
	<!-- 植被信息-结束 -->
    <div class="forest-menu"></div>
	<!-- 事件轴 -->
	<div class="flex-time-wrap">
		<div class="time-inner">
			<div class="time-line">
        <!-- 刻度 -->
        <div class="calibration">
          <div style="height:86px">
            <p class="calibration-hours">{{0}}小时</p>
            <p class="calibration-time">{{beginTime.toLocaleTimeString().slice(2,-3)}}</p>
          </div>
          <div class="calibration-inner" v-for="(item, key) in timmerLineObj.nodeNum" :key="item" :style="item % 5 === 0?'height:86px':''">
            <p v-if="item%5 === 0?true:false" class="calibration-hours">
              {{item/5}}小时
            </p>
            <p v-if="item%5 === 0?true:false" class="calibration-time">{{new Date(beginTime.getTime()+((item/5)*60*1000*60)).toTimeString().slice(0,5)}}</p>
            <p v-if="new Date(beginTime.getTime()+((item/5)*60*1000*60)).toTimeString().slice(0,3) === '00:' && item%5 === 0" class="calibration-time" style="top:122px;color:white;width:auto;white-space: nowrap;word-break:keep-all; ">{{new Date(beginTime.getTime()+((item/5)*60*1000*60)).toJSON().slice(0,10)}}</p>
          </div>
        </div>
      </div>
      <div class="hour-number" v-if="false">
        <!-- <p v-for="(item,key) in 25" :key="item">
          {{key < 10 ?'0':''}}{{key}}
        </p> -->
      </div>
      <div class="time-line-green" style="width:130px;">
        <div class="time-modle"></div>
      </div>
		</div>
    <div class="time-period" v-if="sixTimeModelList.length">
      <p v-for="(item,index) in sixTimeModelList" :key="index" :class="[timePointActive===index?'point-active':'']" @click="timePointChange(item,index)">时间段:{{new Date(item).toLocaleString('chinese',{hour12:false})}}</p>
    
    </div>
    <div class="time-long-show">
      <!-- <p>事件发生时长:<label v-if="saveTimeLong">{{(saveTimeLong - new Date(beginTime).getTime())/6000 }}</label></p> -->
       <p>事件发生时长:<label v-if="saveTimeLong">{{showTimeLong() }}</label></p>
    </div>
    <div class="time-begin-btn" v-if="!isAutoMove" @click="doAutoMove">▶</div>
	</div>
	<Menu />
  </div>
</template>
<script>
import Header from "@/components/APicture/header";
import Menu from "@/components/APicture/menu";
import { getTeamInfo,getWeather,eventTaskSendDetail,yearsStaticsFire,getEventDetail } from "@/api/floodPreventionWar";
import {nowDisasterRelief, nowFireBrigade, nowTeamExpert
 } from '@/api/forestFire'
import indexVue from '../floodDedense/components/MeteorologyModule/index.vue';
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  props: {},
  components: { Header, Menu,vueSeamlessScroll },
  data() {
    return {
      pageType: "show",
      // 当前救灾物资
      disasterReliefList: [
        {
          url:require('../../assets/images/forestFire/icon_car.png'),
          materialName:'消防车',
          materialNum:0,
          unit:'辆'
        },
        {
          url:require('../../assets/images/forestFire/icon_annihilator.png'),
          materialName:'灭火器',
          materialNum:0,
          unit:'个'
        },
        {
          url:require('../../assets/images/forestFire/icon_helicopter.png'),
          materialName:'直升机',
          materialNum:0,
          unit:'辆'
        },
        {
          url:require('../../assets/images/forestFire/icon_UAV.png'),
          materialName:'无人机',
          materialNum:0,
          unit:'辆'
        },
        {
          url:require('../../assets/images/forestFire/icon_people.png'),
          materialName:'防护服',
          materialNum:0,
          unit:'套'
        },
        {
          url:require('../../assets/images/forestFire/icon_spray.png'),
          materialName:'喷雾机',
          materialNum:0,
          unit:'台'
        },
        {
          url:require('../../assets/images/forestFire/icon_satellite_phone.png'),
          materialName:'卫星电话',
          materialNum:0,
          unit:'台'
        },
        {
          url:require('../../assets/images/forestFire/icon_chain_saw.png'),
          materialName:'油锯',
          materialNum:0,
          unit:'台'
        },
      ],
      // 当前救火队伍情况
      saveFireTeamList: [],
      // 救火专家队伍情况
      nowTeamExpertList: [],
      //靶向范围选中
      targetingList: [
        { key: 0, name: "一公里" },
        { key: 1, name: "两公里" },
        { key: 2, name: "三公里" },
      ],
      targetingChose: 1,
      // 植被信息隐藏显示
      vegetationShow: false, // 全是植被信息
      checkVegetationInfo: false, // 查看植被信息
      waterInfo: false, //水源信息
      vegetationShowObj: {
        height: "auto",
      },
      vegetationHiddenObj: {
        height: "65px",
        overflow: "hidden",
      },
      // 物联点数据实时展示2
      connectionLabList: [
        { key: 0, name: "图片" },
        { key: 1, name: "视频" },
      ],
      tabActive: 0,
      temperatureOneDiv: null,
      temperatureTwoDiv: null,
      temObjShow:{
        nowTem:null,
        tem: null,// 温度
        waterTem:null,// 湿度,
        windDirection:null,// 风向
        windStrength: null, //
        weatherDesc: null // 天气状态
      },
      // 火场坡度
      slopeChartDiv:null,
      // 指令对象
      orderList: [],
      feedBack: [],
      lineIsDown:false,
      saveMoveTime:0,
      beginTime:new Date(),
      currentMoveTime:0,// 时间轴改变的时间搓
	  currentMoveStep:0,// 时间轴行进的步数
      timeOut:null,
      yearsStaitcsObj:{// 年度火灾统计
       carNum:'',
        created: '',
        deathNum: '',
        equipmentList: [],
        minorWoundNum: '',
        personnelNum:'',
        ranksName: '',
        rescueTeamList: [],
        sceneReliefMaterialsList:[],
        seriousInjuryNum: '',
        waitReliefMaterialsList: [],
      },
      eventDatailObj:{
        
      },
      //时间轴配置
      timmerLineObj:{
        // 默认 24小时-120个节点，1px=32000毫秒,每个节点12分钟
        // 8小时-40个节点，1px=10666.7毫秒,每个节点12分钟
        // 6小时-30个节点，1px=8000毫秒,每个节点12分钟
        showHours: 6, //展示小时-120个节点
        nodeNum: 30,// 节点数
        onePxSecond: 8000// 1px的毫秒数
      },
      //  保存时长
      saveTimeLong: 0,
      sixTimeModelList:[],//时间段数组
      timePointActive:0,
      isAutoMove:true
    };
  },
  watch:{
    lineIsDown:function(newVal,oldVal){
      if(oldVal === true && !newVal){
        //  console.log('====>',this.getNowTimeAbleMobe())
        let isMoveTime = new Date(this.beginTime).getTime() + this.saveMoveTime
        console.log(8989898,new Date(this.currentMoveTime).toLocaleString(),new Date(isMoveTime).toLocaleString())
        if(this.getNowTimeAbleMobe(isMoveTime)) {// 是否允许拖动到此点
          this.currentMoveTime = new Date(this.beginTime).getTime() + this.saveMoveTime
		  const greenLine = document.querySelector('.time-line-green');
		  let nowGreenLine = parseFloat(greenLine.style.width);
		  console.log('greenLine1111111',parseFloat(greenLine.style.width));
		  console.log('greenLine1111111',this.currentMoveStep);
        } else {
          this.$message.warning('无法滑动到未开始时间')
          this.initDateGreenLine() //回到当前时间点
          this.timeLineTimoutOut() // 重新开启计算市场移动时间轴
          this.isAutoMove = true// 
        }
      }
      console.log('watch',newVal,oldVal,this)
    }
  },
  created() {
    // this.remoteDatas();
    // 当前救灾
    this.getNowDisasterRelief()
    // 当前队伍就火
    this.getNowFireBrigade()
    // 森林火灾专家情况
    this.getNowTeamExpert()
    // 事件指令
    this.getEventTaskSendDetail()
    // 年度统计
    this.getYearsStaitcs()
    // 事件详情
    this.userIDGetEventDetail()
  },
  mounted() {
    this.$nextTick(() => {
		    this.init()
      this.initTimeLine()
	    this.initChart()
      this.timeLineMove()
      this.timeLineTimoutOut()
    });
  },
  beforeDestroy(){
	 pGzznCore.closeLayer3D();
	 pGzznCore = null;
   this.timeOut = null
  },
  methods: {
    init() {
      pGzznCore = new gzznCore("crystalContainer");
      pGzznCore.FlyTo(2);
    },
    // 初始化Echart图
    initChart() {
      // 温度统计1
	  this.getWeatherFun().then(res=>{
		  this.temperatureOneDiv = this.$echarts.init(
			document.getElementsByClassName("meteorology-chart-line")[0]
		  );
		  let resDatas = {
			  titleName:'温度统计',
			  seriesName:'温度统计',
			  ...res
		  }
		  this.temperatureOneDiv.setOption(this.temperatureOneChart(resDatas));
	  })
      // 温度统计2
	   this.getWeatherFun().then(res=>{
		    this.temperatureTwoDiv = this.$echarts.init(
			  document.getElementsByClassName("meteorology-chart-line")[1]
		    );
			let resDatas = {
			titleName:'湿度统计',
			seriesName:'湿度统计',
			xDabaList:res.xDabaListWater,
			seriesDataList:res.seriesDatWateraList
		}
		this.temperatureTwoDiv.setOption(this.temperatureOneChart(resDatas));
	  })
    // 坡度地形图
    this.slopeChartDiv =  this.$echarts.init(document.getElementsByClassName("slope-chart")[0])
    this.slopeChartDiv.setOption(this.placeChart())
     
      // 物联点实时数据统计

      // 当前主要蓄水情况
    },
    // 靶向范围选择
    doChoseTarget(key) {
      this.targetingChose = key;
    },
    // 植被信息显示
    toShowVegetation(type) {
      this["" + type] = true;
    },
    // 隐藏植被信息
    toHiddenVegetation(type) {
      this["" + type] = false;
    },
    //
    doTabActive(key) {
      this.tabActive = key;
    },
    //Echart参数方法
    temperatureOneChart(obj) {
      let option = {
        title: {
          text: obj.titleName,
          itemGap: 30,
          textStyle: {
            color: "#02ffff",
            fontSize: "32px",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          left: "30",
          right: "0",
          bottom: "0",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: obj.xDabaList,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "22px",
              },
            },
            lineStyle: {
              type: [10, 10],
              dashOffset: 5,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "22px",
              },
            },
            splitLine: {
              //网格线
              lineStyle: {
                type: [10, 10],
                dashOffset: 5,
                //type:'dotted', //设置网格线类型 dotted：虚线 ,dashed:虚线,solid:实线
                color: "#ffffff",
              },
              show: true, //隐藏或显示
            },
          },
        ],
        series: [
          {
            name: obj.seriesName,
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data:  obj.seriesDataList,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#12486a", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#112b4c", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            lineStyle: {
              color: "#00feff",
            },
          },
        ],
      };
      return option;
    },
    // 地形chart
    placeChart (obj) {
      let option = {
            xAxis: {
        type: 'category',
        boundaryGap: false
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '30%']
            },
            visualMap: {
                type: 'piecewise',
                show: false,
                dimension: 0,
                seriesIndex: 0,
                pieces: []
            },
            series: [
                {
                    type: 'line',
                    smooth: 0.6,
                    symbol: 'none',
                    lineStyle: {
                      color: "#00feff",
                    },
                    itemStyle: {
                      color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color: "#12486a", // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#112b4c", // 100% 处的颜色
                          },
                        ],
                        global: false, // 缺省为 false
                      },
                    },
                    markLine: {
                        
                        label: {show: true},
                        data: [
                            {xAxis: 1},
                            {xAxis: 2},
                            {xAxis: 3},
                            {xAxis: 4}
                        ]
                    },
                    areaStyle: {
                      color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color: "#12486a", // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#112b4c", // 100% 处的颜色
                          },
                        ],
                        global: false, // 缺省为 false
                      },
                    },
                    data: [
                        ['2019-10-10', 200],
                        ['2019-10-11', 560],
                        ['2019-10-12', 750],
                        ['2019-10-13', 580],
                        ['2019-10-14', 250],
                        ['2019-10-15', 300],
                        ['2019-10-16', 450],
                        ['2019-10-17', 300],
                        ['2019-10-18', 100]
                    ]
                }
            ]
      }
      return option
    },
    // 温度-湿度echartDatas
    getWeatherFun () {
      return new Promise((resolve,reject)=>{
        getWeather("440100000000").then((res)=>{
          if(res.success){
            if(res.body && res.body.length ){
              let saveList = JSON.parse(JSON.stringify(res.body))
              let xDabaList = []// 温度X轴
              let seriesDataList = []// 温度数据
              let xDabaListWater = []// 湿度X轴
              let seriesDatWateraList = []// 湿度数据
              saveList.map((item,index)=>{
                if(index < 7){
                  xDabaList.push(item.monitorTime.slice(-5))
                  seriesDataList.push(item.temp?item.temp:0)
                  xDabaListWater.push(item.monitorTime.slice(-5))
                  seriesDatWateraList.push(item.humidity)
                }
              })
              this.temObjShow = JSON.parse(JSON.stringify(
                {
                  nowTem: saveList[0].temp,
                  tem: `${saveList[0].temp}℃~${saveList[saveList.length-1].temp}℃`,// 温度
                  waterTem:`${saveList[0].humidity}~${saveList[saveList.length-1].humidity}`,// 湿度,
                  windDirection:`${saveList[0].windDirection}`,// 风向
                  windStrength: `${saveList[0].windStrength}`,
                  weatherDesc:saveList[0].weatherDesc //
                }
              ))
              resolve({
                xDabaList:xDabaList,
                seriesDataList:seriesDataList,
                xDabaListWater:xDabaListWater,
                seriesDatWateraList:seriesDatWateraList
              })
            } else {
              resolve({
                xDabaList:xDabaList,
                seriesDataList:seriesDataList,
                xDabaListWater:xDabaListWater,
                seriesDatWateraList:seriesDatWateraList
              })
            }
          } else {
            resolve({
              xDabaList:xDabaList,
              seriesDataList:seriesDataList,
              xDabaListWater:xDabaListWater,
              seriesDatWateraList:seriesDatWateraList
            })
          }
        }).catch((error)=>{
          if(error){
            reject({
              xDabaList:xDabaList,
              seriesDataList:seriesDataList,
              xDabaListWater:xDabaListWater,
              seriesDatWateraList:seriesDatWateraList
            })
          }
        })
      }) 
    },
    // 地形chart
    
    // 当前救灾物资
    getNowDisasterRelief () {
      nowDisasterRelief().then(res=>{
        if(res.success) {
          if(res.body && res.body.length) {
            this.disasterReliefList.map((item,index)=>{
              let saveObj = null
              saveObj = res.body.find((i,k)=>{
                  // console.log(item.materialName,i.materialName)
                if(item.materialName == i.materialName){
                return i
              } })
              if(saveObj) {
                item.materialNum = saveObj.materialNum
              }
            })
					  this.disasterReliefList = JSON.parse(JSON.stringify(this.disasterReliefList)) 
            // this.disasterReliefList = JSON.parse(JSON.stringify(res.body)) 
          }
        }
      })
    },
    // 当前救火队伍救火情况
    getNowFireBrigade () {
      nowFireBrigade().then(res=>{
        if(res.success) {
          if(res.body && res.body.length) {
            this.saveFireTeamList = res.body
          }
        }
      })
    },
    // 森林火灾专家情况
    getNowTeamExpert () {
      nowTeamExpert().then(res=>{
        if(res.success) {
          console.log('森林火灾专家情况', res)
          if(res.body && res.body.length) {
            this.nowTeamExpertList = res.body
          }
        }
      })
    },
    // 获取年度统计
    getYearsStaitcs (){
      yearsStaticsFire({body:{sid:'2712883158710632581'}}).then(res=>{
        if(res.success) {
          console.log('年度火灾统计',res)
          this.yearsStaitcsObj = res.body

        }
      })
    },
    // 根据id 获取事件详情
    userIDGetEventDetail() {
      getEventDetail({body:{
        sid:'2521067874866184192'
      }}).then(res=>{
        if(res.success) {
          this.eventDatailObj = {}
          if(res.body && res.body.length) {
            this.eventDatailObj = res.body[0]
          }
          // console.log('事件详情',res)
        }
      })
    },
    // 事件详情
    getEventTaskSendDetail () {
      eventTaskSendDetail({body:{eventId:'2521067874866184192'}}).then(res=>{
        console.log('事件指令',res)
        if(res.success) {
          let saveList = res.body
          if(saveList && saveList.length) {
            saveList.map((item,index)=>{
              this.orderList.push(item)
              this.feedBack.push(item.feedBackList[0])
            })
          } 
        }
      })
    },
    // 救火队伍-点击
    fireTeamClick(item,index) {
		pGzznCore.addPromiseFireTeamLocation(item.sid);
	},
    // 救火专家-点击
    teamExpertClick(item,index) {
		pGzznCore.addPromiseFireExpertLocation(item.sid);
	},
    //获取当前，判断是否允许拖动
    getNowTimeAbleMobe (isMoveTime) {
      let nowTime = new Date().getTime()
      if(isMoveTime < nowTime) {
        return true
      } else {
        return false
      }
      // console.log(this.currentMoveTime, nowTime,this.currentMoveTime<nowTime)
    },
     // 分解传入的事件发生
    toInitTimeLineList (time,callBack=()=>{}) {
      if(this.timeOut){
        clearTimeout(this.timeOut)
        this.timeOut = null
      }
      const greenLine = document.querySelector('.time-line-green')
      let timeNum = new Date(time).getTime() //事件发生事件戳
      let nowTimeNum = new Date().getTime() //现在的事件戳
      let saveTime = nowTimeNum - timeNum // 插件戳发生时长
      let oneLineSecond =  1000*60*60*6 // 每段时间轴的毫秒
      let periondTime = parseInt(saveTime/oneLineSecond) // 事件段拆分
      this.sixTimeModelList = []
      this.beginTime = new Date(time) //获知给初始化时间
      if(periondTime) {// 多于1段
        for(let x = 0; x < periondTime; x++) {
          if(x === 0) {
            this.sixTimeModelList.push(new Date(time))
          } else {
            this.sixTimeModelList.push(new Date(new Date(time).getTime() + (oneLineSecond * x) + 1 ))
            if(x == periondTime-1){
              this.timePointActive = this.sixTimeModelList.length -1
              greenLine.style.width = (nowTimeNum - ( oneLineSecond*periondTime + timeNum ))/this.timmerLineObj.onePxSecond + 130 +'px'
              callBack()
            }
          }
        }
      } else { // 少于1段
        this.sixTimeModelList.push(new Date(time))
        this.timePointActive = this.sixTimeModelList.length -1
        greenLine.style.width = (nowTimeNum - timeNum)/this.timmerLineObj.onePxSecond + 130 + 'px'
        callBack()
      }
    },
    // 当绿色时间轴大于 2700 || 小于130 时触发
    isCurrentWidth () {
      const greenLine = document.querySelector('.time-line-green')
      let gWidth = parseInt((greenLine.style.width).replace('px',''))
      if(gWidth >= 2700){// 大于 2700 
        this.initTimeLine()
        return 'tooBig'
      } else if(gWidth <= 130) { // 小于130
        return 'tooSmall'
      }
    },
    //初始化时间轴
    initTimeLine (){
      this.beginTime =  new Date() // 获取第二模块初始时间
      this.sixTimeModelList.push(this.beginTime) // 增加模块
      const greenLine = document.querySelector('.time-line-green')
      greenLine.style.width = '130px';
    },
    // 时间轴的拖动
    timeLineMove () {
      const that = this
      let x = null
      let y = null
      let mx = null
      let my = null
      let isDown = false
      // let saveMoveTime = 0
      const greenLine = document.querySelector('.time-line-green')
      const moveModel = document.querySelector('.time-modle')
      moveModel.onmousedown = function (e) {
        that.isAutoMove = false
        isDown  = true
        if(that.timeOut){
          clearTimeout(that.timeOut)
        }
        that.lineIsDown = true
        x = e.offsetX
        y = e.offsetY
        console.log('点击的位置',x)
      }
      window.onmousemove = function (e) {
        if(!isDown) {
          return false
        }
        mx = e.offsetX
        my = e.offsetY
        
        let nl = moveModel.offsetLeft + (mx - x)
        greenLine.style.width =  nl + 'px'
        // that.saveMoveTime = ((nl - 110) * 32000) - 640000
        that.saveMoveTime = (nl - 130) * that.timmerLineObj.onePxSecond
       
        console.log('that.saveMoveTime',that.saveMoveTime)
      }
      window.onmouseup = function() {
            //开关关闭
            isDown = false;
            that.lineIsDown = false
      }
      moveModel.onmouseleave = function (e) {
        isDown = false
        that.lineIsDown = false
      }
    },
    initDateGreenLine(){
      let defaultPx = 130
      let pxOne = this.timmerLineObj.onePxSecond
      const greenLine = document.querySelector('.time-line-green')
      let currentTime = new Date().getTime()
      let beginNum = (this.beginTime).getTime()
      // console.log("=============>>99",defaultPx + (( currentTime - beginNum )/pxOne))
      greenLine.style.width = (defaultPx + ((currentTime - beginNum)/pxOne)) +'px'
      return false
      
      // let oneSecondPx =  1/second
    },
    // 时间轴-时间自动滑动
    timeLineTimoutOut () {
      let second = this.timmerLineObj.onePxSecond
      let oneSecondPx =  1/second
      const greenLine = document.querySelector('.time-line-green')
      const moveModel = document.querySelector('.time-modle')
      if(this.timeOut) {
        clearTimeout(this.timeOut)
      }
      this.timeOut = setTimeout(()=>{
        console.log('greenLine',parseFloat(greenLine.style.width),greenLine.offsetWidth,oneSecondPx)
		this.currentMoveStep = parseFloat(greenLine.style.width);
		pGzznCore.addPromiseUpdateTeamPath();
        greenLine.style.width = parseInt((greenLine.style.width).replace('px','')) + 1 +'px'
        this.saveTimeLong =  (parseInt((greenLine.style.width).replace('px','')) - 130) * second + new Date(this.beginTime).getTime()
        clearTimeout(this.timeOut)
        // console.log('istimeout3',6666,this.timeOut)
        this.timeLineTimoutOut()
      },second)
        this.isCurrentWidth()
    },
    // 获取时长
    showTimeLong () {
      let betweenNum = this.saveTimeLong - new Date(this.sixTimeModelList[0]).getTime()
      let second = parseInt((betweenNum/1000/60)%60) // 分钟
      let hours = parseInt((betweenNum/1000/60/60)%24)// 小时
      let datas= parseInt(betweenNum/1000/3600/24)//天
      this.isCurrentWidth()
      return `${datas>10 ? datas:'0'+ datas}天${hours>10?hours:'0'+hours}小时${second>10?second:'0'+second}分钟`
    },
    // 点击事件
    timePointChange(item,index) {
      this.timePointActive = index
      this.beginTime= new Date(item) 
      const greenLine = document.querySelector('.time-line-green')
      
      if(index === this.sixTimeModelList.length-1 ) {
         greenLine.style.width = 130 + ( new Date().getTime() - new Date(this.beginTime).getTime())/this.timmerLineObj.onePxSecond  +'px'
      } else {
        greenLine.style.width = 130+ 2700+'px';
      }
    },
    doAutoMove() {
      this.isAutoMove = true
      this.beginTime= this.sixTimeModelList[this.sixTimeModelList.length-1]
      this.initDateGreenLine() //回到当前时间点
      this.timeLineTimoutOut()
    }
  },
  computed: {
    defaultOption () {
        return {
            step: 0.2, // 数值越大速度滚动越快
            limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
            hoverStop: true, // 是否开启鼠标悬停stop
            direction: 1, // 0向下 1向上 2向左 3向右
            openWatch: true, // 开启数据实时监控刷新dom
            singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
            singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
            waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
        }
    }

  },
};
</script>

<style scoped="scoped" lang="less">
.show-map{
  height:100%;
  width:calc(100% - 2866px);
  // width:calc(100% - 4442px);
  // width:4690px;
  position:fixed;
  top:0;
  left:1882px;
  left:50%;
  transform: translateX(-50%);
}
.forest-fire {
  width: 100%;
  height: 100%;
  // background: url("../../assets/images/bg_map.png") no-repeat center;
  // background-size: 100% 100%;
  position: relative;
}
/* 公共部分 */
.fire-model-title {
  //   padding: 0 28px;
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  font-size: 46px;
  font-weight: bold;
  color: #01ffff;
  position: absolute;
  left: 50%;
  top: -21px;
  transform: translateX(-50%);
  white-space: nowrap;
}
.scroll-wrap{
    width: 100%;
    height:636px;
    margin: 0 auto;
    overflow: hidden;
}
.fire-list-header {
  width: 100%;
  height: 70px;
  background: #113953;
  color: #feffff;
  font-size: 28px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
}
.file-model-all {
  padding: 62px 14px 10px 14px;
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  p {
    text-align: center;
  }
  p:nth-child(1) {
    flex: 1 0 30%;
  }
  p:nth-child(2) {
    flex: 1 0 20%;
  }
  p:nth-child(3) {
    flex: 1 0 20%;
  }
  p:nth-child(4) {
    flex: 1 0 20%;
  }
}
.fire-list-content {
  width: 100%;
  height: calc(100% - 133px);
  overflow: hidden;
  li {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: nowrap;
    font-size: 26px;
    color: #feffff;
    border-bottom: 2px #314c53 solid;
    min-height: 78px;
    
    div {
      text-align: center;
    }
    div:nth-child(1) {
      flex: 1 0 30%;
      cursor: pointer;
    }
    div:nth-child(2) {
      flex: 1 0 20%;
    }
    div:nth-child(3) {
      flex: 1 0 20%;
    }
    div:nth-child(4) {
      flex: 1 0 20%;
    }
  }
  li:nth-child(1) {
    margin-top: 22px;
  }
  & li:last-child {
    border-bottom: 0px;
  }
}
/* 左侧模块 */
.forest-left {
  // width: 2249px;
  width: 1550px;
  // height: auto;
  height:100%;
  position: absolute;
  left: 0;
  top: 0px;
  padding-top:220px;
  background-image: linear-gradient(to right, #182734, #182734, #182734, rgba(20, 27, 53, 0.4));
  box-shadow: 0 0 190px #182734;
  /*  padding: 50px 0 0 0;
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box; */
  .forest-left-top {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    .left-top-meteorology {
      height: 753px;
      width: 1500px;
      background: url("../../assets/images/forestFire/bg_meteorology.png")
        no-repeat center;
      //   background-size: 100% 100%;
      position: relative;
      padding: 50px 0 0 0;
      box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      margin-right: 40px;
      .meteorology-title {
        padding: 0 28px;
        box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        font-size: 46px;
        font-weight: bold;
        color: #01ffff;
        position: absolute;
        left: 50%;
        top: -21px;
        transform: translateX(-50%);
      }
      .meteorology-show {
        width: 100%;
        height: 150px;
        ul {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: flex-start;
          padding: 0 20px;
          box-sizing: border-box;
          -o-box-sizing: border-box;
          -ms-box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          li {
            flex: 1 0 25%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .li-content-img {
              display: flex;
              justify-content: flex-start;
              margin-right: 23px;
              img {
                display: block;
                width: 120px;
                height: auto;
              }
            }
            .li-content-logo {
              width: auto;
              height: 100%;
              margin-right: 30px;
              .li-img-text {
                font-size: 28px;
                color: white;
              }
              .li-img-icon {
                display: block;
                width: auto;
                height: auto;
                margin-bottom: 6px;
                margin-top: 8px;
                img {
                  display: block;
                  width: 57px;
                  height: 67px;
                  margin: 0 auto;
                }
              }
            }
            .li-content-detail {
              width: 138px;
              height: 100%;
              position: relative;
              padding-left: 6px;
              box-sizing: border-box;
              -o-box-sizing: border-box;
              -ms-box-sizing: border-box;
              -moz-box-sizing: border-box;
              -webkit-box-sizing: border-box;
              color: #01ffff;
              .li-now-tem {
                width: 100%;
                height: 92px;
                font-size: 55px;
                font-weight: bold;
                font-family: "微软雅黑";
                color: #01ffff;
                padding: 24px 0 0 0;
                box-sizing: border-box;
                -o-box-sizing: border-box;
                -ms-box-sizing: border-box;
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                margin-bottom: 9px;
                text-shadow: 0 0 20px #aef;
              }
              .li-about-tem {
                font-size: 24px;
                color: #01ffff;
              }
              .li-now-unit {
                position: absolute;
                top: 14px;
                right: 17px;
                color: #01ffff;
                font-size: 23px;
              }
              .li-now-state {
                position: absolute;
                top: 55px;
                right: 7px;
                color: #01ffff;
                font-size: 29px;
              }
            }
            .detail-padding {
              padding-top: 27px;
              box-sizing: border-box;
              -o-box-sizing: border-box;
              -ms-box-sizing: border-box;
              -moz-box-sizing: border-box;
              -webkit-box-sizing: border-box;
              p {
                line-height: 42px;
                font-size: 26px;
              }
            }
          }
        }
      }
      .meteorology-chart {
        width: 100%;
        height: 488px;
        display: flex;
        justify-content: space-between;
        padding: 0 30px;
        box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        .meteorology-chart-line {
          flex: 1 0 50%;
        }
      }
    }

  }
  .forset-left-bottom {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 95px;
    .left-bottom-content {
      // flex: 1 0 715px;
      width: 715px;
      flex-shrink: 0;
      height: 826px;
      background: url("../../assets/images/forestFire/bg_material.png")
        no-repeat center center;
      position: relative;
      margin: 0 38px 0 0;

      /* 救火物资情况 */
      .left-bottom-material {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding-top: 80px;
        box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        li {
          width:50%;
          flex-shrink:0;
          height: 109px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor:pointer;
          //   margin-top: 80px;
          .material-img {
            display: block;
            height: 81px;
            width: auto;
          }
          .material-detail {
            height: 100%;
            width: auto;
            position: relative;
            .material-detail-type {
              word-wrap: nowrap;
              color: white;
              font-size: 28px;
              line-height: 48px;
            }
            .material-detail-number {
              word-wrap: nowrap;
              color: #00ffff;
              font-size: 32px;
              font-weight: bold;
              line-height: 48px;
            }
            .material-detail-unit {
              word-wrap: nowrap;
              color: white;
              font-size: 28px;
              position: absolute;
              right: -32px;
              bottom: 16px;
            }
          }
        }
      }
    }
    .left-bottom-margin {
      margin: 0 38px;
    }
    //  当前救火右边模块
    .left-top-right {
        width: 740px;
        flex-shrink: 0;
        height: 826px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      .wood-fire-spread {
        width: 100%;
        height: 216px;
        background: url("../../assets/images/forestFire/bg_wood_fire_model.png")
          no-repeat center center;
        text-align: center;
        background-size: 100% 100%;
        padding: 25px 25px;
        box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        div {
          width: 40%;
          flex-shrink: 0;
          height: 100%;
          cursor: pointer;
          font-size: 46px;
          color: #00ffff;
          font-weight: bold;
          padding: 20px 0 0 0;
          box-sizing: border-box;
          -o-box-sizing: border-box;
          -ms-box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          p {
            width: 202px;
            height: 72px;
            line-height: 72px;
            font-size: 30px;
            color: white;
            border: 1px #15bfcc solid;
            margin: 18px 0px 0 39px;
            box-shadow: 0 0 30px #00ffff inset;
          }
        }
      }
      /* 靶向短信 */
      .fire-targeting-msg {
        width: 100%;
        height: 671px;
        margin-top: 60px;
        background: url("../../assets/images/forestFire/bg_holiday.png")
          no-repeat center center;
        background-size: 100% 100%;
        position: relative;
        padding: 50px 34px 0 34px;
        box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        .targeting-msg-chose {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: flex-start;
          p {
            width: auto;
            margin-right: 8px;
            padding: 0 21px;
            box-sizing: border-box;
            -o-box-sizing: border-box;
            -ms-box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            color: white;
            font-size: 25px;
            border: 1px #01ffff solid;
            line-height: 48px;
            cursor: pointer;
          }
          p:hover {
            opacity: 0.8;
          }
          .chose-p {
            box-shadow: 0 0 20px #01ffff;
            background: rgba(22, 139, 156, 0.6);
          }
        }
        .targeting-msg-chart {
          width: 100%;
          height: 252px;
          margin-top: 20px;
          .msg-chart-wrap1 {
            margin: 0 auto;
            width: 570px;
            height: 252px;
            border-radius: 50% 50%;
            background: rgba(48, 212, 178, 0.4);
            display: flex;
            align-items: center;
            position: relative;

            .chart-show-number {
              position: absolute;
              height: 157px;
              width: 187px;
              bottom: 9px;
              left: 50%;
              transform: translateX(-50%);
              background: url("../../assets/images/forestFire/bg_targeting_number.png")
                no-repeat no-repeat center;
              z-index: 8888;
              line-height: 91px;
              text-align: center;
              font-size: 22px;
              color: #01274c;
            }
            .msg-chart-wrap2 {
              margin: 0 auto;
              width: 379px;
              height: 161px;
              border-radius: 50% 50%;
              background: rgba(48, 212, 178, 0.7);
              border: 5px #4ece9b solid;
              display: flex;
              align-items: center;
              position: relative;
              .chart-show-number {
                position: absolute;
                height: 157px;
                width: 187px;
                bottom: 9px;
                left: 50%;
                transform: translateX(-50%);
                background: url("../../assets/images/forestFire/bg_targeting_number.png")
                  no-repeat no-repeat center;
                z-index: 8888;
                line-height: 91px;
                text-align: center;
                font-size: 22px;
                color: #01274c;
              }
              .msg-chart-wrap3 {
                margin: 0 auto;
                width: 225px;
                height: 100px;
                border-radius: 50% 50%;
                background: rgba(48, 212, 178, 1);
                position: relative;
                .chart-show-number {
                  position: absolute;
                  height: 157px;
                  width: 187px;
                  bottom: 9px;
                  left: 50%;
                  transform: translateX(-50%);
                  background: url("../../assets/images/forestFire/bg_targeting_number.png")
                    no-repeat no-repeat center;
                  z-index: 8888;
                  line-height: 91px;
                  text-align: center;
                  font-size: 22px;
                  color: #01274c;
                }
              }
            }
          }
        }
        .targeting-msg-btn {
          width: 206px;
          height: 50px;
          border: 1px #01ffff solid;
          color: white;
          font-size: 25px;
          line-height: 50px;
          margin: 13px auto 0;
          text-align: center;
          cursor: pointer;
        }
        .targeting-msg-btn:hover {
          opacity: 0.6;
        }
      }
    }
  }
}
/* 2020年火灾统计 */
.forest-center {
  width: 3328px;
  height: 186px;
  position: fixed;
  // top: 20%;
  top:250px;
  left: 50%;
  transform: translateX(-50%);
  background: url("../../assets/images/forestFire/bg_year-center.png") no-repeat
    no-repeat center;
  background-size: 100% 100%;
  padding: 0 50px;
  .forest-center-list {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    li {
      width: 20%;
      flex-shrink: 0;
      padding: 0 52px;
      box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      .center-list-event {
        font-size: 28px;
        font-weight: bold;
        color: #00fefc;
        width: 100%;
        text-align: center;
        margin-bottom: 28px;
      }
      .center-list-detail {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        font-size: 26px;
        color: white;
        p {
          span {
            color: #00fefc;
            padding-right: 6px;
          }
        }
      }
    }
  }
}
/* 右侧模块 */
.forest-right {
  // width: 2133px;
  width: 1250px;
  height: 100%;
  position: absolute;
  right: 0;
  padding-top: 220px;
  padding-right:252px;
  display: flex;
  justify-content: flex-end;
  background-image: linear-gradient(to left, #182734, #182734, #182734, rgba(20, 27, 53, 0.4));
  box-shadow: 0 0 190px #182734;
  .forest-right-left {
    width: 978px;
    height: auto;
    margin: auto;
    margin-top: 68px;
    .right-left-connection2 {
      width: 100%;
      height: 465px;
      background: url("../../assets/images/forestFire/bg_connection2.png")
        no-repeat no-repeat center;
      background-size: 100% 100%;
      position: relative;
      margin-bottom: 76px;
      padding: 56px 37px 12px 64px;
      box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      .connection2-tab {
        width: 100%;
        height: 60px;
        display: flex;
        p {
          height: 53px;
          line-height: 53px;
          color: white;
          line-height: 53px;
          font-size: 33px;
          margin-right: 40px;
          cursor: pointer;
        }
        .active-tab {
          font-weight: bold;
          color: #00ffff;
          border-bottom: 7px #00ffff solid;
        }
      }
      .left-connection2-wrap {
        margin-top: 40px;
        height: 242px;
        width: 100%;
        overflow: hidden;
        ul {
          width: auto;
          height: 100%;
          overflow: hidden;
          li {
            height: 100%;
            width: 350px;
            margin: 0 0 0 32px;
            background: black;
            float: left;
          }
          li:nth-child(1) {
            margin-left: 0px;
          }
        }
      }
    }
    .right-left-uav2 {
      width: 100%;
      height: 619px;
      background: url("../../assets/images/forestFire/bg_radio_wrap.png") no-repeat
        no-repeat center;
      background-size: 100% 100%;
      position: relative;
      padding: 65px 65px 0 60px;
      box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      border-radius: 40px 40px;
      .uav-list-wrap {
        width: auto;
        height: 200px;
        overflow: hidden;
        .left-uav-list {
          width: 730px;
          height: 200px;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          float: left;
          li {
            width: 50%;
            flex: 2 0 46%;
            height: 194px;
            padding: 0 14px 0 14px;
            div {
              height: 100%;
              background: black;
              border: 1px #04c8e0 dashed;
              cursor: pointer;
            }
          }
        }
      }
      .left-uav-title {
        width: 100%;
        font-size: 46px;
        font-weight: bold;
        color: #00fffe;
        text-align: center;
        margin-bottom: 26px;
      }
    }
  }
  .forest-right-right {
    width: 978px;
    height: auto;
    // height:100%;
    .right-left-water {
      width: 100%;
      // height:100%;
      // height:1658px;
      height:870px;
      //height: 780px;
      background: url("../../assets/images/dragonBoat/bg_event-thing.png") no-repeat
        no-repeat center;
      background-size:100% 100%;
      position: relative;
      // margin-bottom: 83px;
      padding:36px 32px 0 32px;
      box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }
    .right-left-fire {
      width: 100%;
      height: 780px;
      background: url("../../assets/images/forestFire/bg_water.png") no-repeat
        no-repeat center;
      position: relative;
      padding:56px 32px;
      box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }
  }
}
.forest-message {
  width: 482px;
  height: auto;
  position: absolute;
  bottom: 50px;
  right: 2177px;
  margin-bottom: 26px;
}
/*植被信息  */
.forest-vegetation {
  width: 482px;
  // height:716px;
  height: auto;
  border: 3px #42c6ae solid;
  background: #0a1f4e;
  opacity: 0.6;
  margin-bottom: 20px;
  .forest-vegetation-title {
    width: 100%;
    height: 58px;
    border-bottom: 1px #516798 solid;
    display: flex;
    align-items: center;
    position: relative;
    .vegetation-title-icon {
      width: 6px;
      height: 25px;
      background: #00fefe;
      margin: 0 16px 0 22px;
    }
    .vegetation-title-text {
      font-size: 32px;
      color: white;
      font-weight: bold;
    }
    .vegetation-title-close {
      font-size: 32px;
      color: white;
      font-weight: bold;
      position: absolute;
      right: 20px;
      top: 13px;
      cursor: pointer;
    }
  }
  .forest-vegetation-statices {
    width: 100%;
    height: auto;
    line-height: 45px;
    color: white;
    font-size: 28px;
    margin: 17px 0 28px 0;
    p {
      margin-left: 14px;
      span {
        color: #42c6ae;
      }
    }
  }
  .forest-vegetation-list {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: flex-start;
    li {
      width: 128px;
      flex-shrink: 0;
      height: 116px;
      margin-left: 24px;
      .li-num {
        width: 100%;
        height: 61px;
        background: url("../../assets/images/forestFire/bg_vegetation.png")
          no-repeat no-repeat center;
        background-size: 100% 100%;
        font-size: 28px;
        color: #01ffff;
        text-align: center;
        line-height: 61px;
        span {
          font-size: 16px;
        }
      }
      .li-name {
        height: 56px;
        text-align: center;
        color: white;
        font-size: 24px;
        line-height: 56px;
      }
    }
  }
  .forest-vegetation-hidden {
    width: 100%;
    height: 58px;
    color: #01ffff;
    font-size: 26px;
    position: relative;
    .vegetation-title-center {
      width: 100%;
      height: 100%;
      text-align: center;
      text-align: center;
      font-weight: bold;
      line-height: 58px;
    }
    .vegetation-title-open {
      position: absolute;
      right: 10px;
      top: 0;
      line-height: 58px;
      height: 58px;
      cursor: pointer;
    }
  }
}
/* 事件轴 */
.flex-time-wrap {
  width: 2990px;
  height: 227px;
  background: url("../../assets/images/bg_time_scroll_03.png") no-repeat
    no-repeat center;
  background-size: 100% 100%;
  position: fixed;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  padding: 13px 15px 12px 12px;
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  .time-inner {
    width: 100%;
    height: 100%;
    border-radius: 30px 30px;
    display: flex;
    align-items: center;
    position:relative;
    .time-line {
      width: 100%;
      height: 12px;
      background: #01ffff;
    }
    .calibration{
      // width:2772px;
      width:2700px;
      height:auto;
      position:absolute;
      // background:yellow;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      display:flex;
      justify-content:space-between ;
      align-items: center;
      div{
        width:2px;
        height:54px;
        background:#01ffff;
        position:relative;
        .calibration-hours{
          flex-shrink: 0;
          height:100%;
          line-height: 26px;
          color:#00ffff;
          font-size:26px;
          width:120px;
          text-align: left;
          position:absolute;
          top: -36px;
          left: -30px;
          width: 120px;
          height: 26px;
        }
        .calibration-time{
            flex-shrink: 0;
            height:100%;
            line-height: 26px;
            color:#00ffff;
            font-size:26px;
            width:120px;
            text-align: left;
            position:absolute;
            bottom: -36px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 26px;
            text-align: center;
        }
        
      }
    }
    .time-line-green{
      width: 20%;
      height: 12px;
      background:#58fa44;
      position:absolute;
      left: 0;
      top:50%;
      transform: translateY(-50%;);
      .time-modle{
        width:48px;
        height:140px;
        background:url("../../assets/images/forestFire/bg_timmer_btn_06.png");
        background-size:100% 100%;
        position:absolute;
        right:-48px;
        top:50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }
    .hour-number{
      width:2772px;
      height:26px;
      position:absolute;
      left:50%;
      top:20px;
      transform: translateX(-50%);
      display:flex;
      justify-content: space-around;
      p{
        flex-shrink: 0;
        height:100%;
        line-height: 26px;
        color:#00ffff;
        font-size:26px;
        width:120px;
        text-align: center;
      }
    }
  }
  .time-period{
    max-width:2900px;
    width:auto;
    height:46px;
    border-top:1px solid #00fefc;
    border-left:1px solid #00fefc;
    border-right:1px solid #00fefc;
    position:absolute;
    top:-46px;
    left:46px;
    display:flex;
    p{
      height:100%;
      line-height: 46px;
      color:white;
      font-size:24px;
      padding:0 16px;
      cursor: pointer;  
      word-break:keep-all;       
      white-space:nowrap;        /* 不换行 */
    }
    p:hover{
      box-shadow: 0 0 12px #00fefc inset;
    }
    .point-active{
      box-shadow: 0 0 12px #00fefc inset;
    }
  }
  .time-long-show{
    width:auto;
    height:72px;
    position:absolute;
    top:-103px;
    left:50%;
    transform: translateX(-50%);
    p{
      color:#00ffff;
      font-size:32px;
      line-height: 72px;
    }
  }
}

.right-right-order{
  width:100%;
  height:100%;
  background:url("../../assets/images/forestFire/bg_time_line(2).png") no-repeat no-repeat center;
  ul{
    height:100%;
    width:100%;
    margin-bottom:10px;
    display:flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li{
      height:33%;
      width:auto;
      min-width:30%;
      max-width:50%;
      div{
        height:50%;
        overflow: auto;
        width:auto;
      
        color:white;
        font-size:24px;
      }
    }
  }
}
.right-right-content {
    width: 100%;
    height: calc(100% - 92px);
    overflow: auto;
    padding-left: 24px;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    overflow: auto;
    ul {
      width: 100%;
      border-left: 2px #1f4e84 solid;
      li {
        width: 100%;
        height: auto;
        padding-left: 23px;
        padding-bottom: 24px;
        box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        position: relative;
        .li-event-title {
          width: 100%;
          height: 42px;
          color: white;
          display: flex;
          align-items: center;
          p {
            width: auto;
            color: white;
            font-size: 23px;
            display: flex;
            align-items: center;
            img {
              display: block;
              width: 32px;
              height: 32px;
              margin-top: 5px;
              margin-right: 7px;
            }
            span {
              display: block;
              margin-right: 20px;
            }
          }
          label {
            font-size: 23px;
          }
          .green {
            color: #46e777;
          }
          .blue {
            color: #03cff2;
          }
        }
        .li-event-detail {
          width: 100%;
          height: auto;
          //   background-size: 100% 100%;
          color: white;
          font-size: 23px;
          padding: 22px 26px;
          box-sizing: border-box;
          -o-box-sizing: border-box;
          -ms-box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
        }
        .bg-task {
          // border: 1px #2dc86c solid;
          background: url("../../assets/images/dragonBoat/bg_task.png")
            no-repeat no-repeat center;
          background-size: 100% 100%;
        }
        .bg-trouble {
          // border: 1px #2459b9 solid;
          background: url("../../assets/images/dragonBoat/bg_trouble.png")
            no-repeat no-repeat center;
          background-size: 100% 100%;
        }
        .li-icon-task {
          display: block;
          width: 24px;
          height: 25px;
          position: absolute;
          top: 8.5px;
          left: -12px;
        }
      }
    }
  }
  .time-begin-btn{
    width:80px;
    height:80px;
    border-radius: 50% 50%;
    border:1px #00fefc solid;
    box-shadow: 0 0 18px #00fefc inset;
    position: absolute;
    top:-140px;
    left:50%;
    transform:translateX(-50%);
    color:white;
    text-align: center;
    font-size:46px;
    line-height:80px;
    cursor: pointer;
  }
  /* 新增-部分 */
  .forset-left-new{
    width:100%;
    height:auto;
    display:flex;
    padding-top:100px;
     .left-bottom-content {
      width: 740px;
      flex-shrink: 0;
      height: 826px;
      background: url("../../assets/images/forestFire/bg_material.png")
        no-repeat center center;
      background-size: 100% 100%;
      position: relative;
      /* 救火物资情况 */
      
    }
    .left-bottom-margin {
      width: 715px;
      margin: 0 38px 0  0;
    }
  }
</style>
