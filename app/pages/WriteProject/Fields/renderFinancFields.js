import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import { Trans } from 'helpers/I18n'
import { FINACASH_TYPE } from 'utils/dict'
import Flex from '../Flex'
import Spacing from '../Spacing'
import AddBtn from '../AddBtn'
import TextField from './TextField'
import SelectField from './SelectField'

function RenderFinancFields({ fields }) {
  if (fields.length === 0) {
    fields.push({})
  }
  return (
    <div>
      {fields.map((team, key) => (
        <div key={key}>
          <div style={{ marginTop: key !== 0 ? '30px' : 0 }}>
            <Flex flex={1}>
              <Field
                name={`${team}.financingRotation`}
                placeholder={Trans({ id: '轮次' })}
                component={TextField}
              />
              <Spacing />
              <Field
                name={`${team}.financingTokenNum`}
                placeholder={Trans({ id: '融资代币量' })}
                type="number"
                component={TextField}
              />
            </Flex>
            <Flex flex={1} marginTop="20px">
              <Field
                name={`${team}.financingStartTime`}
                placeholder={Trans({ id: '开始时间' })}
                type="date"
                component={TextField}
              />
              <Spacing />
              <Field
                name={`${team}.financingEndTime`}
                placeholder={Trans({ id: '结束时间' })}
                type="date"
                component={TextField}
              />
            </Flex>
            <Flex flex={1} marginTop="20px">
              <Flex style={{ width: '100%', alignItems: 'flex-end' }}>
                <Field
                  name={`${team}.currentRoundPrice`}
                  placeholder={Trans({ id: '本轮单价' })}
                  component={TextField}
                  type="number"
                />
                <Field
                  name={`${team}.cashType`}
                  placeholder={Trans({ id: '单位' })}
                  component={SelectField}
                  style={{ width: '102px' }}
                  list={FINACASH_TYPE}
                />
              </Flex>
              <Spacing />
              <div style={{ width: '100%' }} />
            </Flex>

          </div>
          <AddBtn
            style={{ marginTop: '26px' }}
            onClick={() => fields.remove(key)}
            icon="icon-remove"
            name="Remove"
          />
        </div>
      ))}
      <AddBtn
        style={{ marginTop: '26px' }}
        onClick={() => fields.push({})}
        name="Add"
      />
    </div>
  )
}

RenderFinancFields.propTypes = {
  fields: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default RenderFinancFields
