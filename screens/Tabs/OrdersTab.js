import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { dates2, DATE_FORMAT, today } from "../../utils/dateProvider";
import { OrderCard, Button } from "../../ui";
import { PageContent, Navbar, NavbarItem } from "../../utils/AppTor";
import i18n from "../../utils/i18n";
import { connect } from "react-redux";
import moment from "moment";
import * as orderActions from "../../actions/orders";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff"
  }
});

const RenderSegmets = props => {
  const { segments, active, handleSegment } = props;

  return (
    <View
      borderRadius={4}
      style={{
        borderColor: "#46763a",
        borderWidth: 1,
        height: 40,
        margin: 11,
        flexDirection: "row"
      }}
    >
      {segments.map(segment => {
        return (
          <TouchableOpacity
            key={segment.id}
            onPress={() => {
              handleSegment(segment.id);
            }}
            style={{
              flex: 1,
              borderColor: "#46763a",
              borderWidth: 0.5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: segment.id == active ? "#46763a" : "#fff"
            }}
          >
            <Text style={{ color: segment.id == active ? "#fff" : "#46763a" }}>
              {segment.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

class OrdersTab extends Component {
  constructor(props) {
    super(props);
    this.handleSegment = this.handleSegment.bind(this);
    this.state = {
      activeSegment: 0
    };
  }

  handleSegment(id) {
    this.setState({ activeSegment: id });
  }

  componentDidMount() {
    this.fetchOrders()
  }

  fetchOrders() {
    const { id } = this.props.user;
    this.props.getOrders(id, today);
  }

  render() {
    const { activeSegment } = this.state;
    const { orders: { list, loading } } = this.props;

    let segmentNames = [
      { id: 0, name: i18n.t("today") },
      { id: 1, name: i18n.t("tomorrow") },
      { id: 2, name: i18n.t("yesterday") }
    ];

    const data = list&&list.filter(order => {
      const orderDate = moment(order.Date).format(DATE_FORMAT);
      return orderDate === dates2[activeSegment];
    });

    return (
      <View style={{ flex: 1 }}>
        <Navbar>
          <NavbarItem showText={true} backLink={'Back'} backText={i18n.t("Back")} firstTab={true}/>
          <NavbarItem title={i18n.t("harvestOrders")} />
          <NavbarItem />
        </Navbar>

        {
          loading ? <ActivityIndicator /> :
            <React.Fragment>
              <RenderSegmets
                active={activeSegment}
                segments={segmentNames}
                handleSegment={this.handleSegment}
              />

              <PageContent>
                <View style={{ marginBottom: 100 }}>
                  <Button
                    style={{ marginLeft: 25, marginRight: 25, width: "100%", borderRadius: 10, marginBottom: 10, alignSelf: 'center' }}
                    onPress={() => this.fetchOrders()}
                    yellow
                    radius>
                    {i18n.t("refresh")}
                  </Button>
                  {data.length < 1 ? <Text>{i18n.t("noOrders")}</Text> : null}
                  {data.map((cardProps, index) => {
                    return <OrderCard key={index} {...cardProps} />;
                  })}
                </View>
              </PageContent>
            </React.Fragment>
        }
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    user: state.profile.user,
  };
};

OrdersTab = connect(mapStateToProps, orderActions)(OrdersTab);

export default OrdersTab;
