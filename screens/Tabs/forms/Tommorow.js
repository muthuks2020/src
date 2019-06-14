import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { TitleBlock, Button } from '../../../ui';
import { reduxForm, Field, formValueSelector, FieldArray } from 'redux-form';
import { compose, bindActionCreators } from 'redux';
import RenderInputs from './RenderInputs';
import { connect } from 'react-redux';
import * as actions from '../../../actions/forcast';
import sumReducer from '../../../utils/sumReducer';
import moment from 'moment';
import { DATE_FORMAT2, DATE_FORMAT3 } from '../../../utils/dateProvider';
import i18n from '../../../utils/i18n'

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

const selector = formValueSelector('tommorow');

class Today extends React.Component {

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.props.initialize(this.props.initialValues)
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
      const currentReason = reasons.find(reason => reason.id === input.ReasonCodeId);

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
      editObj['RanchNumber'] = ranch.Code;
      editData.push(editObj);
      return obj;
    })

    forecast['ForecastDate'] = date,
      forecast['PlanningGroups'] = planningGroups;
    forecastRequest['RanchNumber'] = ranch.Code;
    forecastRequest['UserId'] = id;
    forecastRequest['ForecastDetails'] = [forecast];
    forecastRequest['Unit'] = "Crates",
      forecastRequest['ForecastLocalTime'] = moment(date).format(DATE_FORMAT3),
      data['ForecastRequest'] = forecastRequest;

    this.props.editForecast2(data, id, editData);
    onSubmit();
  }

  handleCancel() {
    const { dirty } = this.props;
    if (dirty) {
      Alert.alert('You have unsaved changes that will be lost', 'Do you want save them?', [
        {
          text: 'Ok',
          onPress: () => console.log('OK pressed')
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        }
      ],
        { cancelable: false })
    }
  }

  renderThresholdAlert() {
    const { threshold, reset, total } = this.props;

    Alert.alert(`Current total quantity (${total}) exeeds the threshold quantity (${threshold})`, 'Please discard incorret values', [{ text: 'Ok', onPress: () => { reset() } }], { cancelable: false });
  }

  render() {
    const { ranch, date, page, handleSubmit, reset, reasons, total = 0, previousPage, initialValues } = this.props;

    return (
      <View>

        {/* Title */}
        <TitleBlock>
          {ranch.Name.toUpperCase()}
        </TitleBlock>

        {/* Sub title */}
        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 30, marginBottom: 15 }}>
          <Text style={{ fontSize: 20, color: 'green' }}>
            {i18n.currentLocale() === "en" ? `T${page} ${i18n.t("forecast")}` : `${i18n.t("forecast")} T${page}`}
          </Text>
          <Text style={{ color: "#424242" }}>
            {moment(date).format(DATE_FORMAT2)}
          </Text>
        </View>

        {/* Input Area */}
        <View style={{ backgroundColor: '#F4F4F4', padding: 25, borderRadius: 10 }}>

          {/* Headers */}
          <View style={{ paddingBottom: 20, borderBottomColor: '#c1c1c1', borderBottomWidth: 1 }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingTop: 10, alignItems: 'center' }}>
              <Text style={[styles.tableHeader, { textAlign: 'left' }]}>{i18n.t("planningGroup")}</Text>
              <Text style={[styles.tableHeader, { textAlign: 'right' }]}>{`${i18n.t("quantity")} (${initialValues.inputs[0].Unit ? initialValues.inputs[0].Unit : "Crates"})`} </Text>
              {page === 0 && <Text style={[styles.tableHeader, { textAlign: 'right' }]}>{i18n.t("reasonCode")}}</Text>}
            </View>
          </View>

          {/* Inputs */}
          <FieldArray name="inputs" component={RenderInputs} reasons={reasons} groups={ranch.PlanningGroups} page={page} formName="tommorow" />

          {/* Total  */}
          <View style={{ paddingTop: 15, borderTopColor: '#c1c1c1', borderTopWidth: 1 }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingTop: 10, alignItems: 'center' }}>
              <Text style={{ textAlign: 'left', color: "#424242", flex: 1, }}>Total</Text>
              <Text style={{ flex: 1, textAlign: 'right', fontWeight: '700', fontSize: 18, color: '#000' }}>{total}</Text>
              {page === 0 && <Text style={{ flex: 1, textAlign: 'right' }}></Text>}
            </View>
          </View>

          {/* Refresh Button */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Button style={{ marginTop: 25, width: 220, borderRadius: 10 }} onPress={() => reset()} yellow radius>{i18n.t("refresh")}</Button>
          </View>

        </View>

        {/* Next Previous Buttons  */}
        <View style={{ flexDirection: 'row', width: '100%', padding: 10 }}>
          <Button style={{ flex: 1, marginRight: 5 }} onPress={previousPage} green>{i18n.t("previous")}</Button>
          <Button style={{ flex: 1, marginLeft: 5 }} onPress={handleSubmit(this.submitForm)} yellow radius>{i18n.t("next")}</Button>
        </View>
      </View>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  const inputValues = selector(state, 'inputs') || [];
  const total = inputValues.reduce(sumReducer, 0);

  return {
    reasons: state.forecast.reasons,
    profile: state.profile,
    total
  }
}

Today = connect(mapStateToProps, actions)(Today);

Today = reduxForm({
  form: 'tommorow',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true
})(Today);

export default Today;