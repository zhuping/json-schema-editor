import React, { ReactElement, useContext } from 'react';
import _ from 'lodash';
import { Col, Row, Select } from 'antd';
import { EditorContext } from '../../editor';
import Schema from '../../../types/Schema';
import LocalProvider from '../../local-provider/index';

const Option = Select.Option;

interface SchemaBooleanProp {
  data: Schema;
}

const changeOtherValue = (
  value: string,
  name: string,
  data: Schema,
  change: (newValue: Schema) => void
) => {
  const valueForChange = value === 'true';
  const newData = _.cloneDeep(data);
  if (typeof value === 'undefined') {
    delete newData[name];
  } else {
    newData[name] = valueForChange;
  }
  change(newData);
};

const SchemaBoolean = (props: SchemaBooleanProp): ReactElement => {
  const { data } = props;
  const context = useContext(EditorContext);

  const value = data.default === undefined ? '' : data.default ? 'true' : 'false';
  return (
    <div>
      <div className="default-setting">{LocalProvider('base_setting')}</div>
      <Row className="other-row" align="middle">
        <Col span={4} className="other-label">
          {LocalProvider('default')}：
        </Col>
        <Col span={20}>
          <Select
            value={value}
            allowClear
            placeholder={LocalProvider('default')}
            style={{ width: 200 }}
            onChange={(value) => {
              changeOtherValue(value, 'default', data, context.changeCustomValue);
            }}
          >
            <Option value="true">true</Option>
            <Option value="false">false</Option>
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default SchemaBoolean;
