import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { TitleBlock, Button } from '../../../ui';
import { reduxForm, formValueSelector, FieldArray, submit } from 'redux-form';
import RenderInputs from './RenderInputs';
import { connect } from 'react-redux';
import * as actions from '../../../actions/forcast';
import * as toastActions from '../../../actions/toast';
import sumReducer from '../../../utils/sumReducer';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { DATE_FORMAT2, DATE_FORMAT3 } from '../../../utils/dateProvider';
import i18n from '../../../utils/i18n'
import { REFRESH_FORECAST } from '../../../utils/constant'; //'../../../utils/constant';

const styles = StyleSheet.create({
  tableHeader: {
    flex: 1,
    fontSize: 13,
    color: "#42424288"
  },
  tableValue: {
    flex: 1,
    color: "#424242"
  },
  input: {
    width: 50,
    textAlign: "right"
  }
});

const selector = formValueSelector('today');

class Today extends React.Component {

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.refreshValues = this.refreshValues.bind(this);
    this.submitValues = this.submitValues.bind(this);
  }

  componentDidMount() {
    this.props.initialize(this.props.initialValues);
  }

  handleCancel() {
    const { dirty, editForecast, ranch, data, reset, destroy, dispatch } = this.props;
    if (dirty) {
      Alert.alert('You have unsaved changes that will be lost', 'Do you want to discard changes?', [
        {
          text: 'Ok',
          onPress: () => { reset(); Actions.pop(); }
        },
        {
          text: 'Cancel',
          onPress: f => f,
          style: 'cancel',
        }
      ],
        { cancelable: false })
    } else {
      Actions.pop();
    }
  }

  renderThresholdAlert() {
    const { threshold, reset, total } = this.props;
    Alert.alert(`Current total quantity (${total}) exeeds the threshold quantity (${threshold})`, 'Please discard incorret values', [{ text: 'Ok', onPress: () => { reset() } }], { cancelable: false });
  }

  refreshValues(values) {
    const { ranch, date, profile: { user: { id } }, reasons } = this.props;
    const editData = [];
    const forecastRequest = {};
    const forecast = {};
    const data = {};
    const planningGroups = values.inputs.map(input => {
      const obj = {};
      const editObj = {};
      const currentReason = reasons && reasons.find(reason => reason.id === input.ReasonCodeId);

      obj['PlanningGroupName'] = input.PlanningGroupNumber;
      obj['Quantity'] = input.Quantity;

      if (currentReason === undefined || currentReason === null) {
        obj['ReasonCodeName'] = "";
        editObj['ReasonCodeName'] = ""
      } else {
        obj['ReasonCodeName'] = currentReason.id === 0 ? "" : currentReason.value;
        editObj['ReasonCodeName'] = currentReason.id === 0 ? "" : currentReason.value;
      }

      editObj['PlanningGroupNumber'] = input.PlanningGroupNumber;
      editObj['ForecastDate'] = date;
      editObj['Quantity'] = 0;
      editObj['RanchNumber'] = ranch && ranch.Code;
      editData.push(editObj);
      return obj;
    })

    forecast['ForecastDate'] = date
    forecast['PlanningGroups'] = planningGroups;
    forecastRequest['RanchNumber'] = ranch && ranch.Code;
    forecastRequest['UserId'] = id;
    forecastRequest['ForecastDetails'] = [forecast];
    forecastRequest['Unit'] = "Crates",
      forecastRequest['ForecastLocalTime'] = moment(date).format(DATE_FORMAT3),
      data['ForecastRequest'] = forecastRequest;

    console.log("Edit data ", editData)
    this.props.updateForecast(REFRESH_FORECAST, editData);
    setTimeout(() => {
      this.forceUpdate()
    }, 3000)
  }

  submitValues(values) {
    const { ranch, date, profile: { user: { id } }, reasons } = this.props;
    const editData = [];
    const forecastRequest = {};
    const forecast = {};
    const data = {};
    const planningGroups = values.inputs.map(input => {
      const obj = {};
      const editObj = {};
      const currentReason = reasons && reasons.find(reason => reason.id === input.ReasonCodeId);

      obj['PlanningGroupName'] = input.PlanningGroupNumber;
      obj['Quantity'] = input.Quantity;

      if (currentReason === undefined || currentReason === null) {
        obj['ReasonCodeName'] = "";
        editObj['ReasonCodeName'] = ""
      } else {
        obj['ReasonCodeName'] = currentReason.id === 0 ? "" : currentReason.value;
        editObj['ReasonCodeName'] = currentReason.id === 0 ? "" : currentReason.value;
      }

      editObj['PlanningGroupNumber'] = input.PlanningGroupNumber;
      editObj['ForecastDate'] = date;
      editObj['Quantity'] = input.Quantity;
      editObj['RanchNumber'] = ranch && ranch.Code;
      editData.push(editObj);
      return obj;
    })

    forecast['ForecastDate'] = date
    forecast['PlanningGroups'] = planningGroups;
    forecastRequest['RanchNumber'] = ranch && ranch.Code;
    forecastRequest['UserId'] = id;
    forecastRequest['ForecastDetails'] = [forecast];
    forecastRequest['Unit'] = "Crates",
      forecastRequest['ForecastLocalTime'] = moment(date).format(DATE_FORMAT3),
      data['ForecastRequest'] = forecastRequest;

    console.log("Edit data ", editData)
    this.props.updateForecast(REFRESH_FORECAST, editData);
  }

  submitForm(values) {
    const { ranch, date, onSubmit, profile: { user: { id } }, reasons } = this.props;
    const editData = [];
    const forecastRequest = {};
    const forecast = {};
    const data = {};
    const planningGroups = values.inputs.map(input => {
      const obj = {};
      const editObj = {};
      const currentReason = reasons && reasons.find(reason => reason.id === input.ReasonCodeId);

      obj['PlanningGroupName'] = input.PlanningGroupNumber;
      obj['Quantity'] = input.Quantity;

      if (currentReason === undefined || currentReason === null) {
        obj['ReasonCodeName'] = "";
        editObj['ReasonCodeName'] = ""
      } else {
        obj['ReasonCodeName'] = currentReason.id === 0 ? "" : currentReason.value;
        editObj['ReasonCodeName'] = currentReason.id === 0 ? "" : currentReason.value;
      }

      editObj['PlanningGroupNumber'] = input.PlanningGroupNumber;
      editObj['ForecastDate'] = date;
      editObj['Quantity'] = input.Quantity;
      editObj['RanchNumber'] = ranch && ranch.Code;
      editData.push(editObj);
      return obj;
    })

    forecast['ForecastDate'] = date,
      forecast['PlanningGroups'] = planningGroups;
    forecastRequest['RanchNumber'] = ranch && ranch.Code;
    forecastRequest['UserId'] = id;
    forecastRequest['ForecastDetails'] = [forecast];
    forecastRequest['Unit'] = "Crates",
      forecastRequest['ForecastLocalTime'] = moment(date).format(DATE_FORMAT3),
      data['ForecastRequest'] = forecastRequest;

    this.props.editForecast(data, id, editData);
    onSubmit();
  }

  render() {
    const { ranch, date, page, handleSubmit, reset, reasons, total = 9999, initialValues } = this.props;
    return (
      <View>

        {/* Title */}
        <TitleBlock>
          {ranch.Name.toUpperCase()}
        </TitleBlock>

        {/* Sub title */}
        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 30, marginBottom: 15 }}>
          <Text style={{ fontFamily: 'Rubik', fontSize: 20, color: 'green' }}>
            {i18n.currentLocale() === "en" ? `T${page} ${i18n.t("forecast")}` : `${i18n.t("forecast")} T${page}`}
          </Text>
          <Text style={{ fontFamily: 'Rubik', color: "#424242" }}>
            {moment(date).format(DATE_FORMAT2)}
          </Text>
        </View>

        {/* Input Area */}
        <View style={{ backgroundColor: '#F4F4F4', padding: 25, borderRadius: 10 }}>

          {/* Headers */}
          <View style={{ paddingBottom: 20, borderBottomColor: '#c1c1c1', borderBottomWidth: 1 }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingTop: 10, alignItems: 'center' }}>
              <Text style={[styles.tableHeader, { textAlign: 'left', fontFamily: 'Rubik' }]}>{i18n.t("planningGroup")}</Text>
              <Text style={[styles.tableHeader, { textAlign: 'right', fontFamily: 'Rubik' }]}>{`${i18n.t("quantity")} (${initialValues.inputs[0].Unit ? initialValues.inputs[0].Unit : "Crates"})`} </Text>
              {page === 0 && <Text style={[styles.tableHeader, { textAlign: 'right', fontFamily: 'Rubik' }]}>{i18n.t("reasonCode")}</Text>}
            </View>
          </View>

          {/* Inputs */}
          <FieldArray name="inputs" component={RenderInputs} reasons={reasons} groups={ranch.PlanningGroups} page={page} formName="today" />

          {/* Total  */}
          <View style={{ paddingTop: 15, borderTopColor: '#c1c1c1', borderTopWidth: 1 }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingTop: 10, alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Rubik', textAlign: 'left', color: "#424242", flex: 1, }}>{i18n.t("total")}</Text>
              <Text style={{ fontFamily: 'Rubik', flex: 1, textAlign: 'right', fontWeight: '700', fontSize: 18, color: '#000' }}>{total}</Text>
              {page === 0 && <Text style={{ fontFamily: 'Rubik', flex: 1, textAlign: 'right' }}></Text>}
            </View>
          </View>

          {/* Refresh Button */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Button style={{ marginTop: 25, width: 220, borderRadius: 10 }} onPress={handleSubmit(this.refreshValues)} yellow radius>{i18n.t("refresh")}</Button>
          </View>

        </View>

        {/* Next Previous Buttons  */}
        <View style={{ flexDirection: 'row', width: '100%', padding: 10 }}>
          <Button style={{ flex: 1, marginRight: 5 }} onPress={this.handleCancel} green>{i18n.t("cancel")}</Button>
          <Button style={{ flex: 1, marginLeft: 5 }} onPress={handleSubmit(this.submitForm)} yellow radius>{i18n.t("next")}</Button>
        </View>
      </View>
    )
  }
};

Today = reduxForm({
  form: 'today',
  enableReinitialize: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(Today);

const mapStateToProps = (state, ownProps) => {
  const inputValues = selector(state, 'inputs') || [];
  console.log("Input values ", inputValues)
  const total = inputValues.reduce(sumReducer, 0);
  console.log("Value of total ", total)
  return {
    reasons: state.forecast.reasons,
    profile: state.profile,
    total
  }
}

Today = connect(mapStateToProps, { ...actions, ...toastActions })(Today);

export default Today;