import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { PageContent, Navbar, NavbarItem, Page, LoadScreen } from "../../utils/AppTor";
import { TitleBlock, Button } from "../../ui";
import { connect } from 'react-redux';
import * as orderActions from '../../actions/orders';
import { DATE_FORMAT, DATE_FORMAT2, DATE_IN_MILISECONDS } from "../../utils/dateProvider";
import DateProvider from '../../utils/_DateProvider';
import moment from "moment";
import i18n from '../../utils/i18n';

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: "column",
    width: "100%",
    padding: 5,
    marginBottom: 5
  },
  detailHeader: {
    flex: 1,
    fontSize: 14,
    marginBottom:5,
    color: "#42424288"
  },
  detail: {
    flex: 1,
    fontSize: 14,
    color: "#424242"
  },
  tableValue: {
    fontSize: 12,
    color: "#424242"
  },
  tableHeader: {
    fontSize: 12,
    color: "#42424288"
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    padding: 10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 10,
  },
  contentText: {
    color: "#424242",
    marginBottom:5
  },
  active: {
  },
  inactive: {
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },

});

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.onPressModify = this.onPressModify.bind(this);
    this.dp = new DateProvider();
  }
  state = {
    block: "-",
    country: "-",
    comment: "Harvest Planner Comment",
    reviewed: false,
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <View style={{flexDirection:'row'}}>
          <Image style={{ height: 12, width: 12, marginRight:5,alignSelf:'center' }} resizeMode={'contain'} source={isActive ? require('../../source/collapse.png') : require('../../source/expand.png')} />
          <Text style={[styles.headerText,{color:"#46763a"}]}>{section.OrderItemCode}</Text>
        </View>
        <Text style={[styles.headerText,{textAlign:"right"}]}>{section.QtyOrdered}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.contentText}>
          {section.OrderItemDescription}
        </Text>
        <Text style={styles.contentText}>
           {"DC - "+section.Warehouse}
        </Text>
        <Text style={styles.contentText}>
          {section.PalletType}
        </Text>
        <Text style={[styles.contentText,{display:section.MrlBlockDesignator==""?'none':"flex"}]}>
          {section.MrlBlockDesignator}
        </Text>
        <Text style={[styles.contentText,{display:section.DestinationCountry==""?'none':"flex"}]}>
          {section.DestinationCountry}
        </Text>
      </Animatable.View>
    );
  }

  getDefaultValue(value) {
    return (value === "" || value === null || value === undefined) ? "" : value;
  }

  onPressModify(RanchCode) {
    const { forecast: { ranch: { list } }, order: { details: { IsoHarvestDate } } } = this.props;

    const currentRanch = list.find(ranch => ranch.Code === RanchCode);
    LoadScreen("TodayTab", { ranch: currentRanch, startDate: IsoHarvestDate });
  }

  componentDidUpdate() {
    const { network: { isConnected }, order: { details }, companyId, currentDate, orderNumber} = this.props;
    const { reviewed } = this.state;

    if(isConnected && !reviewed) {

      let currentDetails = null;

      if(details.length > 0) {
        currentDetails = details.find( detail => this.dp.formatDate(detail.IsoHarvestDate, DATE_FORMAT2) === this.dp.formatDate(currentDate, DATE_FORMAT2) && detail.OrderNbr === orderNumber);
      }

      if(currentDetails) {
        const reviewStatus = {
          "OrderId": currentDetails.OrderNbr,
          "Status": "Reviewed",
          "CompanyId": companyId,
          "TransInfo": {
            "TransactionDateTime": moment.utc().format(),
            "SourceSystem": "apiAX",
            "SourceUser": ""
          }
        }
        //if(!reviewStatus.Status.toUpperCase().includes("REV")){
          this.props.submitReviewStatus(reviewStatus, currentDate, orderNumber);
        //}
      }

      this.setState({
        reviewed: true
      })
    }
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    const { order: { details, loadingDetails, Comments, DestinationCountry, MrlBlockDesignator}, currentDate, orderNumber} = this.props;
    let currentDetails = null;
    let todayInMili = 0;
    let harvestDateInMili = 0;

    if (details.length > 0) {
      currentDetails = details.find(detail => this.dp.formatDate(detail.IsoHarvestDate, DATE_FORMAT2) === this.dp.formatDate(currentDate, DATE_FORMAT2) && detail.OrderNbr === orderNumber);
    }

    if (currentDetails) {
      todayInMili = this.dp.getToday(DATE_IN_MILISECONDS);
      harvestDateInMili = this.dp.formatDate(currentDetails.IsoHarvestDate, DATE_IN_MILISECONDS);
    }


    return (

      <Page>
        <Navbar>
          <NavbarItem backLink={i18n.t("Back")} />
          <NavbarItem title={i18n.t("harvestOrdersDetails")} />
          <NavbarItem />
        </Navbar>

        
        <PageContent noPadding style={{paddingLeft:10,paddingRight:10}}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:5}}>
            {
              loadingDetails ? <ActivityIndicator /> :
                <React.Fragment>
                  <TitleBlock style={{marginTop:10}}>{i18n.t("details")}</TitleBlock>
                  {
                    currentDetails ?
                      (<View
                        style={{
                          backgroundColor: "#F4F4F4",
                          margin: -10,
                          marginTop: 10,
                          padding: 10,
                          borderRadius: 10
                        }}
                      >
                        <View style={{flexDirection:'row'}}>
                          <View style={[styles.detailContainer,{flex:2}]}>
                            <Text
                              style={[styles.detailHeader, { textAlign: "left", flex: 4 }]}
                            >
                              {i18n.t("harvestOrderNumber")}
                            </Text>
                            <Text style={[styles.detail, { textAlign: "left", flex: 5 }]}>
                              {this.getDefaultValue(currentDetails.OrderNbr)}
                            </Text>
                          </View>
                          <View style={[styles.detailContainer,{flex:1}]}>
                           <Text
                              style={[styles.detailHeader, { textAlign: "left", flex: 4 }]}
                            >
                              {i18n.t("date")}
                            </Text>
                            <Text style={[styles.detail, { textAlign: "left", flex: 5 }]}>
                              {this.getDefaultValue(this.dp.formatDate(currentDetails.IsoHarvestDate, DATE_FORMAT))}
                            </Text>
                          </View>
                          </View>
                        
                        <View style={{flexDirection:'row'}}>
                          <View style={[styles.detailContainer,{flex:2}]}>
                            <Text
                              style={[styles.detailHeader, { textAlign: "left", flex: 4 }]}
                            >
                              {i18n.t("ranchNumber")}
                            </Text>
                            <Text style={[styles.detail, { textAlign: "left", flex: 5 }]}>
                              {this.getDefaultValue(currentDetails.RanchNbr)}
                            </Text>
                        </View>
                        <View style={[styles.detailContainer,{flex:1}]}>
                        
                          <Text
                            style={[styles.detailHeader, { textAlign: "left", flex: 4 }]}
                          >
                            {i18n.t("berryType")}
                          </Text>
                          <Text style={[styles.detail, { textAlign: "left", flex: 5 }]}>
                            {this.getDefaultValue(currentDetails.BerryType)}
                          </Text>
                        </View>
                        
                        </View>
                        <View style={styles.detailContainer}>
                          <Text
                            style={[styles.detailHeader, { textAlign: "left", flex: 4 }]}
                          >
                            {i18n.t("ranchName")}
                          </Text>
                          <Text style={[styles.detail, { textAlign: "left", flex: 5 }]}>
                            {this.getDefaultValue(currentDetails.RanchName)}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderTopColor: "#c1c1c1",
                            borderTopWidth: 0.2
                          }}
                        />
                        <View style={{flexDirection:'row',justifyContent:"space-between",padding:10}}>
                          <Text style={styles.detailHeader}>{i18n.t("itemNumber")}</Text>
                          <Text style={[styles.detailHeader,{textAlign:'right'}]}>{i18n.t("qtyCrates")}</Text>
                        </View>

                        <Accordion
                          activeSections={activeSections}
                          sections={currentDetails.OrderLines}
                          touchableComponent={TouchableOpacity}
                          expandMultiple={multipleSelect}
                          renderHeader={this.renderHeader}
                          renderContent={this.renderContent}
                          duration={400}
                          onChange={this.setSections}/>
                        
                        <View
                          style={{
                            borderTopColor: "#c1c1c1",
                            borderTopWidth: 0.2,
                            borderBottomColor: "#c1c1c1",
                            borderBottomWidth: 0.2,
                            marginBottom: 0,
                            marginTop: 0,
                            paddingTop: 0,
                            paddingBottom: 0
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              padding: 10,
                              alignItems: "center"
                            }}
                          >
                          
                            <Text
                              style={{ textAlign: "left", color: "#424242aa", flex: 1 }}
                            >
                              {i18n.t("total")}
                            </Text>
                            <Text
                              style={{
                                flex: 1,
                                textAlign: "right",
                                fontSize: 14,
                                color: "#000"
                              }}
                            >
                              {currentDetails.OrderLines.reduce((a, b) => {
                                const numberA = Number(a);
                                const numberB = Number(b.QtyOrdered);
                                return numberA + numberB;
                              }, 0)}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{ width: "100%", padding: 10 }}
                        >
                          <Text
                            style={[styles.detailHeader, { textAlign: "left", flex: 2 }]}
                          >
                            {i18n.t("comment")}
                          </Text>
                          <Text style={[styles.detail, { textAlign: "left", flex: 3 }]}>
                            {this.getDefaultValue(currentDetails.Comments)}
                          </Text>
                        </View>

                        {/* remove the modify button for *past* harvest orders */}
                        {
                          harvestDateInMili > todayInMili ? <View style={{ flex: 1, alignItems: "center" }}>
                            <Button
                              style={{ marginTop: 25, width: 300, borderRadius: 10,marginBottom:10 }}
                              onPress={() => this.onPressModify(currentDetails.RanchNbr)}
                              yellow
                              radius
                            >
                              {i18n.t("modifyForecast")}
                        </Button>
                          </View> : null
                        }

                      </View>)
                      : <Text>Sorry.Currently there is no data available</Text>
                  }
                </React.Fragment>
            }
          </ScrollView>
        </PageContent>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.orders,
    forecast: state.forecast,
    network: state.network
  };
};

OrderDetail = connect(mapStateToProps, orderActions)(OrderDetail);

export default OrderDetail;