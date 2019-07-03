import React from 'react'
import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import { styled } from '@beanovia/theme'
import { Link, LinkProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import redDress from '../red-dress.jpg'

export default () => (
  <Layout>
    <TitleBar>
      <PageTitle>Product list</PageTitle>
      <AddNew to='/products/add'>Add New</AddNew>
    </TitleBar>
    <Table>
      <Thead>
        <Tr>
          <Th />
          <Th textAlign='center'>
            <FontAwesomeIcon icon={faImage} />
          </Th>
          <Th>Name</Th>
          <Th>Price</Th>
          <Th>Category</Th>
          <Th>Status</Th>
          <Th>Date</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td textAlign='center'>
            <input type='checkbox' />
          </Td>
          <Td textAlign='center'>
            <Thumbnail src={redDress} />
          </Td>
          <Td>The Great Dress</Td>
          <Td>$12.34</Td>
          <Td>Dress</Td>
          <Td>-</Td>
          <Td>Jun 29th, 2019</Td>
        </Tr>
      </Tbody>
    </Table>
  </Layout>
)

const TitleBar = styled.div(({ theme: { spacing } }) => ({
  display: 'flex',
  marginBottom: spacing.base,
}))

const AddNew = styled(Link)<LinkProps>(({ theme: { colors, spacing, text } }) => ({
  display: 'flex',
  alignItems: 'center',

  background: colors.primary,
  color: colors.white,

  border: 'none',
  borderRadius: 4,
  marginLeft: 'auto',
  padding: `${spacing.xtiny}px ${spacing.base}px`,

  ...text.large,
  textDecoration: 'none',
  fontWeight: 'bold',

  boxShadow: `1px 1px 3px 1px ${colors.gray_darker}`,

  ':hover': {
    background: colors.primary_light,
    cursor: 'pointer',
  },
}))

const Table = styled.table({
  width: '100%',
  borderSpacing: 0,
})

const Thead = styled.thead(({ theme: { colors } }) => ({
  background: colors.black_light,
  color: colors.white,
}))

interface CellProps {
  textAlign?: 'left' | 'center'
}

const Th = styled.th<CellProps>(({ textAlign, theme: { spacing } }) => ({
  padding: spacing.small,
  textAlign: textAlign ? textAlign : 'left',
}))

const Tbody = styled.tbody({})

const Tr = styled.tr(({}) => ({
  // Checkbox
  'th:nth-of-type(1), td:nth-of-type(1)': {
    width: 20,
  },
  // Date
  'th:nth-of-type(4), td:nth-of-type(4)': {
    width: 80,
  },
  // Date
  'th:nth-of-type(7), td:nth-of-type(7)': {
    width: 120,
  },
}))

const Td = styled.td<CellProps>(({ textAlign, theme: { colors, spacing } }) => ({
  padding: `${spacing.tiny}px ${spacing.small}px`,
  textAlign: textAlign ? textAlign : 'left',
  borderBottom: `1px solid ${colors.black_light}`,
}))

const Thumbnail = styled.img({
  width: 'auto',
  maxHeight: 64,
})
