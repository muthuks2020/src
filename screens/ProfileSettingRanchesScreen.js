import React, { Component } from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';

import i18n from '../utils/i18n'
import { Page, PageContent, Navbar, NavbarItem } from '../utils/AppTor';
import { TitleBlock, CardItem } from '../ui';

export default class ProfileSettingRanchesScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      isLoading:true,
      ranchStatus:[]
    }
    this.onValueChangeStatus= this.onValueChangeStatus.bind(this)

    console.log("Company ID ", this.props.companyId)
    console.log("constructor props ", this.props)
    console.log("constructor ranches", this.props.ranches)
    console.log("constructor status ", this.state.ranchStatus)

    AsyncStorage.getItem("status").then((statusArr) => {
      if(statusArr){
        stArr=[]
        var asyncRanchStatusArr=JSON.parse(statusArr);
        this.props.ranches.forEach(ranch => {
          f1=0;
          for(i=0;i<asyncRanchStatusArr.length;i++){
            if(ranch.Code==asyncRanchStatusArr[i].code){
              f1=1
              stArr.push(asyncRanchStatusArr[i].status)
              break;
            }
          }
          // end of for loop
          if(f1==0){
            stArr.push(ranch.RanchStatus)
          }
          this.setState({
              ranchStatus:stArr,
              isLoading:false
            })
      });
      }
      else{
        ranchStatuses=[];
        
        this.props.ranches.forEach(ranch => {
            ranchStatuses.push(ranch.RanchStatus);
        });
        this.setState({
          ranchStatus:ranchStatuses,
          isLoading:false
        })
      }
    })
    
  }

  onValueChangeStatus(index){
   AsyncStorage.getItem("status").then((arr)=>{
    if(arr){
       statusAsync=JSON.parse(arr);
       for(i=0;i<statusAsync.length;i++){
        if(statusAsync[i].code==this.props.ranches[index].Code){
          statusAsync[i].status=!statusAsync[i].status;
          AsyncStorage.setItem("status", JSON.stringify(statusAsync));
          changedStatus=this.state.ranchStatus
          changedStatus[index]=!changedStatus[index]
          this.setState({
            ranchStatus:changedStatus
          })
          break;
        }
        else if(i==statusAsync.length-1){
          obj={}
          obj["code"]=this.props.ranches[index].Code
          obj["status"]=!this.props.ranches[index].RanchStatus
          statusAsync.push(obj);
          AsyncStorage.setItem("status", JSON.stringify(statusAsync));
          changedStatus=this.state.ranchStatus
          changedStatus[index]=!changedStatus[index]
          this.setState({
            ranchStatus:changedStatus
          })
          break;
        }
      }
    }
    else{
      statusArr=[]
      obj={}
      obj["code"]=this.props.ranches[index].Code
      obj["status"]=!this.props.ranches[index].RanchStatus
      statusArr.push(obj);
      AsyncStorage.setItem("status", JSON.stringify(statusArr));
      changedStatus=this.state.ranchStatus
      changedStatus[index]=!changedStatus[index]
      this.setState({
        ranchStatus:changedStatus
      })
    }

  })
}

  render() {
    const { ranches } = this.props
    if(!this.state.isLoading)  {
      return (
        <Page>
          <Navbar>
            <NavbarItem showText={true} backLink={'Back'} backText={i18n.t("Back")}/>
            <NavbarItem title={i18n.t("profileSetup")} />
            <NavbarItem />
          </Navbar>
          <PageContent>
            <TitleBlock>{i18n.t("assignedRanches")}</TitleBlock>
            <View style={{marginTop:30, marginBottom:100}}>
              {
                ranches && ranches.map((ranch,index)=>{
                  return  <CardItem 
                            first={index === 0}
                            last={index === ranches.length - 1}
                            key={ranch.Id}  
                            title={ranch.Name} 
                            subtitle={ranch.Code} 
                            switch 
                            checked={this.state.ranchStatus[index]}
                            onValueChange={()=>{this.onValueChangeStatus(index)}}></CardItem>
                })
              }
            </View>
          </PageContent>
        </Page>
      );
    }
    else{
      return (
        <Page>
          <Navbar>
            <NavbarItem showText={true} backLink={'Back'} backText={i18n.t("Back")}/>
            <NavbarItem title={i18n.t("profileSetup")} />
            <NavbarItem />
          </Navbar>
        </Page>
      )
    }
  }
}


