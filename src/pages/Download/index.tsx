import React from 'react';
import styles from './index.less';
import { Breadcrumb, Col, Divider, Row, Table } from 'antd';
import { URL_PREFIX, uniqueArray, IMG_PREFIX } from '@/common/constants';
export default function Page() {
  const dataSource = [
    {
      key: '1',
      description: 'Curated variants',
      size: '3.47MB',
      url: 'https://ngdc.cncb.ac.cn/szgr/file/curated_variant.tsv',
    },
    {
      key: '2',
      description: 'Variant annotations',
      size: '2.36MB',
      url: 'https://ngdc.cncb.ac.cn/szgr/file/variant_annotations.tsv',
    },
    {
      key: '3',
      description: 'Experimental evidence for variants',
      size: '3.68MB',
      url: 'https://ngdc.cncb.ac.cn/szgr/file/variant_experiments.tsv',
    },
    {
      key: '4',
      description: 'Curated genes',
      size: '870KB',
      url: 'https://ngdc.cncb.ac.cn/szgr/file/curated_gene.zip',
    },
    {
      key: '5',
      description: 'Experimental evidence for genes',
      size: '8.26KB',
      url: 'https://ngdc.cncb.ac.cn/szgr/file/gene_experiments.tsv',
    },
    {
      key: '6',
      description: 'Reproducibility score of variants',
      size: '1.20KB',
      url: 'https://ngdc.cncb.ac.cn/szgr/file/variant_score.tsv',
    },
    {
      key: '7',
      description: 'Reproducibility score of genes',
      size: '631KB',
      url: 'https://ngdc.cncb.ac.cn/szgr/file/gene_score.tsv',
    },
  ];

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      // className:'kkk',
    },
    {
      title: 'File Size',
      dataIndex: 'size',
      key: 'size',
      width: 300,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (text: string, record: any) => (
        <a href={record.url} target={'_blank'}>
          {record.url}
        </a>
      ),
    },
  ];

  return (
    <div>
      <Row>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href={URL_PREFIX + '/home'}>
                <strong style={{ fontFamily: 'sans-serif' }}>Home</strong>
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">
                <strong style={{ fontFamily: 'sans-serif' }}>Resource</strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
      <Row justify={'center'}>
        <Col md={20}>
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered={true}
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  );
}
