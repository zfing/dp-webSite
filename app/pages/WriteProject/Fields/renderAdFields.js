import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import { Trans } from 'helpers/I18n'
import Flex from '../Flex'
import Spacing from '../Spacing'
import AddBtn from '../AddBtn'
import UploadField from './UploadField'
import TextField from './TextField'

function RenderAdFields({ fields }) {
  return (
    <div>
      {fields.map((team, key) => (
        <Flex key={key} style={{ marginTop: key !== 0 ? '30px' : 0 }}>
          <Field
            name={`${team}.avatarUrl`}
            title="photo"
            component={UploadField}
          />
          <Flex column flex={1} paddingLeft="28px">
            <Flex flex={1}>
              <Field
                name={`${team}.name`}
                placeholder={Trans({ id: '姓名' })}
                component={TextField}
              />
              <Spacing />
              <Field
                name={`${team}.positionName`}
                placeholder={Trans({ id: '头衔' })}
                component={TextField}
              />
            </Flex>
            <Flex marginTop="20px" column>
              <Field
                name={`${team}.descriptionEn`}
                placeholder={Trans({
                  zh: '个人简介（英文）',
                  en: 'Professional and academic experience (in English)',
                  ko: '개인 프로필 (영어)',
                })}
                component={TextField}
              />
              <Spacing />
              <Field
                name={`${team}.description`}
                placeholder={Trans({
                  zh: '个人简介（中文）',
                  en: 'Professional and academic experience (in Chinese)',
                  ko: '개인 프로필 (중국어)',
                })}
                component={TextField}
              />
            </Flex>
            {key > 0 && (
              <AddBtn
                style={{ marginTop: '26px' }}
                onClick={() => fields.remove(key)}
                icon="icon-remove"
                name="Remove"
              />
            )}
          </Flex>
        </Flex>
      ))}
      <div style={{ paddingLeft: '124px' }}>
        <AddBtn
          style={{ marginTop: '26px' }}
          onClick={() => fields.push({})}
          name="Add"
        />
      </div>
    </div>
  )
}

RenderAdFields.propTypes = {
  fields: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default RenderAdFields
