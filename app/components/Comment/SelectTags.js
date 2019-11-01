import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Tags from './Tags'

const Wrapper = styled.div`
  text-align: center;
`

class SelectTags extends React.PureComponent {
  state = {
    selected: [],
  }

  handle = (item) => {
    const { selected } = this.state
    const { maxSelected } = this.props
    if (selected.indexOf(item) === -1) {
      const nextSelected = [...selected, item]

      if (nextSelected.length > maxSelected) {
        nextSelected.shift()
      }

      this.setState({ selected: nextSelected })
    } else {
      this.setState({ selected: selected.filter(i => i !== item) })
    }
  }

  render() {
    const { selected } = this.state
    const { tags, tagProps, ...props } = this.props

    return (
      <Wrapper {...props}>
        <Tags
          tags={tags}
          renderItemProps={item => ({
            onClick: () => this.handle(item),
            active: selected.indexOf(item) !== -1,
            style: { marginTop: '12px' },
            ...tagProps,
          })}
        />
      </Wrapper>
    )
  }
}

SelectTags.defaultProps = {
  tags: [],
  maxSelected: 5,
  tagProps: {},
}

SelectTags.propTypes = {
  tags: PropTypes.array,
  maxSelected: PropTypes.number,
  tagProps: PropTypes.object,
}

export default SelectTags
