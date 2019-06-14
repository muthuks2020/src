import React, { Component } from 'react';
import moment from 'moment';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from 'react-native';
import { connect } from "react-redux";
import { LoadScreen } from "../utils/AppTor";
import { DATE_FORMAT4 } from '../utils/dateProvider';
import * as orderActions from '../actions/orders';

const styles = StyleSheet.create({
  content: {
      marginTop: 20,
      paddingTop: 12, paddingBottom: 12, paddingLeft: 19, paddingRight: 19,
      height: 100,
      flexDirection: 'row',
      borderWidth: 1,
  }
});

class OrderCard extends Component {
    findCompany = (companies=[], currentRanchCode) => {
      let belongedCompany = {};
      companies.forEach(company => {
        const ranches = company.Ranches || [];
        const isRanchExist = ranches.find( ranch => ranch.Code === currentRanchCode);
        if(isRanchExist) {
          belongedCompany = company
        }
      });

      return belongedCompany;
    }

    render() {
        const { RanchNumber, RanchName, OrderStatus, OrderNumber, Date, BerrytypeName, company: { list, loading }} = this.props;
        const { CompanyId } = this.findCompany(list, RanchNumber);
        const berryImage=BerrytypeName.toUpperCase().startsWith("RAS")?
                          require('../source/berryRasp.png')
                          :BerrytypeName.toUpperCase().startsWith("STR")?
                            require('../source/berryStraw.png')
                            :BerrytypeName.toUpperCase().startsWith("BLU")?
                              require('../source/berryBlue.png')
                              :BerrytypeName.toUpperCase().startsWith("BLA")?
                                require('../source/berryBlack.png')
                                :null;

        const orderStatus=OrderStatus.toUpperCase().includes("REV")?
                          require('../source/green.png')
                          :null;
                            
        return (
            <React.Fragment>
              {
                loading? <ActivityIndicator/>:
                <TouchableOpacity onPress={()=>{
                  this.props.getOrderDetails(OrderNumber, CompanyId);
                  LoadScreen("OrderDetail", {currentDate: Date, companyId: CompanyId, orderNumber: OrderNumber})
                }} style={this.props.style}>
                  <View borderRadius={6} style={[styles.content,{borderColor:OrderStatus.toUpperCase().startsWith("MOD")? "red":'#9b9b9b'}]}>
                      <View style={{ justifyContent: 'space-between', flex: 2 }}>
                          <Text style={{ color: '#4a4a4a', fontSize: 16 }}>{RanchName}</Text>
                          <View style={{ flexDirection:'row', flex: 2,marginTop:15,width:'100%',flex:1 }}>
                            <Image style={{ height: 24, width: 24, marginRight:20 }} resizeMode={'cover'} source={berryImage} />
                            <Text style={{ color: '#4a4a4a', fontSize: 14, }}>{RanchNumber}</Text>
                          </View>
                      </View>
                      <View style={{ justifyContent: 'space-between', alignItems: 'flex-end', flex: 1}}>
                        <Text style={{ color: '#9b9b9b', fontSize: 13,textAlign:"auto" }}>{moment(Date).format(DATE_FORMAT4)}</Text>
                        <Image style={{ height: 24, width: 24, alignSelf:'flex-end',alignItems:'flex-end' }} resizeMode={'cover'} source={orderStatus} />
                      </View>
                  </View>
              </TouchableOpacity>
            }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    profile: state.profile,
    company: state.company
  };
};

OrderCard = connect(mapStateToProps, orderActions)(OrderCard);

export default OrderCard;

