import React from 'react'
import PageTitle from '../components/PageTitle'
import Editor from '../components/Editor'
import Layout from '../components/Layout'
import { emptyProduct } from '../components/Editor/product'

export default () => (
  <Layout>
    <PageTitle>Add Product</PageTitle>
    <Editor product={emptyProduct()} />
  </Layout>
)
