import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import { Trans } from 'helpers/I18n'
import Flex from '../Flex'
import AddBtn from '../AddBtn'
import UploadField from './UploadField'
import TextField from './TextField'

function RenderFundFields({ fields }) {
  return (
    <div>
      {fields.map((team, key) => (
        <div key={key}>
          <Flex style={{ marginTop: key !== 0 ? '30px' : 0 }}>
            <Field
              name={`${team}.fundUrl`}
              title="logo"
              style={{ width: '254px' }}
              component={UploadField}
            />
            <Flex flex={1} marginLeft="28px" column between>
              <Field
                name={`${team}.fundName`}
                placeholder={Trans({ id: '投资者' })}
                component={TextField}
              />
              <Field
                name={`${team}.website`}
                placeholder={Trans({ id: '网站' })}
                component={TextField}
              />
            </Flex>
          </Flex>
          {key > 0 && (
            <AddBtn
              style={{ marginTop: '26px' }}
              onClick={() => fields.remove(key)}
              icon="icon-remove"
              name="Remove"
            />
          )}
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

RenderFundFields.propTypes = {
  fields: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default RenderFundFields
