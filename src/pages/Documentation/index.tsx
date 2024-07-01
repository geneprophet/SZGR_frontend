import React, { useEffect, useState } from "react";
import styles from './index.less';
import { Breadcrumb, Col, Table,Divider,Image, Row,Typography ,Anchor} from "antd";
// @ts-ignore
import { URL_PREFIX } from '@/common/constants';
import classnames from 'classnames';
const { Title, Text, Paragraph } = Typography;
const { Link } = Anchor;
import workflow from '@/assets/workflow.png';
import usage_1 from '@/assets/search.png';
import usage_2 from '@/assets/variant_view.png';
import usage_3 from '@/assets/location_view.png';
import usage_4 from '@/assets/gene_view.png';
import usage_5 from '@/assets/browse_variant.png';
import usage_6 from '@/assets/browse_gene.jpg';
import usage_7 from '@/assets/advance.png';
import usage_8 from '@/assets/co_expression.png';
import usage_9 from '@/assets/resource.png';
export default function Page() {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(
    undefined,
  );
  useEffect(() => {
    setTargetOffset(window.innerHeight / 10);
  }, []);
  const [current, setCurrent] = useState('');
  const onChange = (link: string) => {
    console.log('Anchor: OnChange', link);
    setCurrent(link);
    // console.log(current);
  };
  const dataSource = [
    {
      key: '1',
      datatype: 'Variant',
      subtype: 'common variants (CV)',
      item: '21528 variants',
	  publication: '98'
    },
    {
      key: '2',
      datatype: 'Variant',
      subtype: 'rare/ultrarare variants (RV)',
      item: '149 variants',
	  publication: '10'
    },
    {
      key: '3',
      datatype: 'Variant',
      subtype: 'de novo mutations (DNM)',
      item: '91 variants',
	  publication: '2'
    },
    {
      key: '4',
      datatype: 'Variant',
      subtype: 'copy number variations (CNV)',
      item: '203 variants',
	  publication: '98'
    },
    {
      key: '5',
      datatype: 'Variant',
      subtype: 'structural variants (SV)',
      item: '9 variants',
	  publication: '1'
    },
    {
      key: '6',
      datatype: 'Gene',
      subtype: 'genome-wide association study (GWAS)',
      item: '348 genes',
	  publication: '98'
    },
    {
      key: '7',
      datatype: 'Gene',
      subtype: 'transcriptome-wide association study (TWAS)',
      item: '1350 genes',
	  publication: '12'
    },
    {
      key: '8',
      datatype: 'Gene',
      subtype: 'epigenome-wide association study (EWAS)',
      item: '237 genes',
	  publication: '8'
    },
    {
      key: '9',
      datatype: 'Gene',
      subtype: 'differentially expressed gene (DEG)',
      item: '18079 genes',
	  publication: '81'
    },
    {
      key: '10',
      datatype: 'Gene',
      subtype: 'differentially methylated gene (DMG)',
      item: '8164 genes',
	  publication: '18'
    },
    {
      key: '11',
      datatype: 'Gene',
      subtype: 'differentially expressed protein (DEP)',
      item: '171 genes',
	  publication: '4'
    },
    {
      key: '12',
      datatype: 'Gene',
      subtype: 'eQTL based SMR',
      item: '135 genes',
	  publication: '17'
    },
    {
      key: '13',
      datatype: 'Gene',
      subtype: 'eQTL based COLOC',
      item: '584 genes',
	  publication: '6'
    },
    {
      key: '14',
      datatype: 'Gene',
      subtype: 'meQTL based SMR',
      item: '62 genes',
	  publication: '4'
    },
    {
      key: '15',
      datatype: 'Gene',
      subtype: 'meQTL based COLOC',
      item: '548 genes',
	  publication: '3'
    },
    {
      key: '16',
      datatype: 'Experiments',
      subtype: 'massively parallel reporter assays (MPRAs)',
      item: '80968 variants',
	  publication: '5'
    },
    {
      key: '17',
      datatype: 'Experiments',
      subtype: 'CRISRP/Cas9',
      item: '8001 genes',
	  publication: '13'
    },
    {
      key: '18',
      datatype: 'Experiments',
      subtype: 'RNA-seq',
      item: '61161 transcripts',
	  publication: '27'
    },
    {
      key: '19',
      datatype: 'Experiments',
      subtype: 'literature',
      item: '27 variants, 107 genes',
	  publication: '125'
    },
    {
      key: '20',
      datatype: 'single-cell omics data',
      subtype: 'scRNA-seq',
      item: '138 cell types',
	  publication: '7'
    },
    {
      key: '21',
      datatype: 'Target gene',
      subtype: 'co-accessibility',
      item: '216735 regions, 17647 genes, 12 cell types',
	  publication: '2'
    },
    {
      key: '22',
      datatype: 'Target gene',
      subtype: 'PCHi-C',
      item: '109104 regions, 19147 genes, 2 cell types',
	  publication: '3'
    },
    {
      key: '23',
      datatype: 'Target gene',
      subtype: 'Activity-by-contact (ABC) model',
      item: '115971 regions, 17434 genes, 11 cell types',
	  publication: '1'
    },
    {
      key: '24',
      datatype: 'Target gene',
      subtype: 'Roadmap Epigenomics Enhancer-Gene Linking',
      item: '103780 regions, 11286 genes',
	  publication: '1'
    },
    {
      key: '25',
      datatype: 'Target gene',
      subtype: 'eQTL',
      item: '1792311 variants, 19558 genes',
	  publication: '3'
    },
    {
      key: '26',
      datatype: 'Target gene',
      subtype: 'sQTL',
      item: '1523934 variants, 11271 genes',
	  publication: '2'
    },
    {
      key: '27',
      datatype: 'Target gene',
      subtype: 'pQTL',
      item: '10257 variants, 717 genes',
	  publication: '2'
    },
    {
      key: '28',
      datatype: 'Target gene',
      subtype: 'caQTL',
      item: '80425 variants, 1503 genes',
	  publication: '1'
    },
    {
      key: '29',
      datatype: 'Target gene',
      subtype: 'haQTL',
      item: '168602 variants, 1980 genes',
	  publication: '1'
    },
    {
      key: '30',
      datatype: 'Drug',
      subtype: 'Open targets, ChEMBL',
      item: '1554 genes',
	  publication: '2'
    },
  ];

  const columns = [
    {
      title: 'Data type',
      dataIndex: 'datatype',
      key: 'datatype',
    },
    {
      title: 'Subtype',
      dataIndex: 'subtype',
      key: 'subtype',
      width:600,
    },
    {
      title: 'Number of items',
      dataIndex: 'item',
      key: 'item',
      width:600,
    },
	{
      title: 'Number of publications',
      dataIndex: 'publication',
      key: 'publication',
      width:600,
    },
  ];

  // @ts-ignore
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
                <strong style={{ fontFamily: 'sans-serif' }}>Documentation</strong>
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col xs={4} sm={4} md={4}>
          <Anchor targetOffset={targetOffset} onChange={onChange}>
            <Link href="#introduction" title="1. Introduction" onChange={onChange}></Link>
            <Link href="#data collection" title="2. Data collection" onChange={onChange}></Link>
            <Link href="#data analysis" title="3. Data analysis" onChange={onChange}></Link>
              <Link
                href="#annotation"
                title={
                  <div>
                    <p>3.1 Annotation</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#data analysis'),
                })}
              />
              <Link
                href="#validation"
                title={
                  <div>
                    <p>3.2 Validation</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#data analysis'),
                })}
              />
              <Link
                href="#integration analysis"
                title={
                  <div>
                    <p>3.3 Integration analysis</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#data analysis'),
                })}
              />
            <Link href="#database usage" title="4. Database usage"></Link>
              <Link
                href="#search"
                title={
                  <div>
                    <p>4.1 Search</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#database usage'),
                })}
              />
              <Link
                href="#browse-variant"
                title={
                  <div>
                    <p>4.2 Browse-variant</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#database usage'),
                })}
              />
              <Link
                href="#integration analysis"
                title={
                  <div>
                    <p>4.3 Browse-gene</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#database usage'),
                })}
              />
			  <Link
                href="#advance"
                title={
                  <div>
                    <p>4.4 Advance</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#database usage'),
                })}
              />
			  <Link
                href="#toolkit"
                title={
                  <div>
                    <p>4.5 Toolkit</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#database usage'),
                })}
              />
			  <Link
                href="#resource"
                title={
                  <div>
                    <p>4.6 Resource</p>
                  </div>
                }
                className={classnames({
                  [styles.hide]: !current.startsWith('#database usage'),
                })}
              />
            <Link href="#licenses" title="5. Licenses" onChange={onChange} />
          </Anchor>
        </Col>
        <Col
          xs={19}
          sm={19}
          md={19}
          push={1}
          style={{
            fontFamily: 'Trebuchet MS',
            fontSize: '1.1em',
            textAlign: 'justify',
            display: 'inline-block',
          }}
        >
          <div id={'introduction'}>
            <Title level={1}>1. Introduction</Title>
            <Paragraph>
              SZGR 3.0 is a comprehensive schizophrenia data resource that systematically collects, organizes, and analyzes various types of research evidence related to schizophrenia, including genetics, epigenetics, single-cell omics, experimental data, and drug information. Schizophrenia is one of the psychiatric disorders with a significant genetic risk component, often leading to severe and chronic disability. Effective treatments for schizophrenia have been lacking in recent decades. Although major investments in human genetics and genomics have revealed numerous genetic associations and biological insights related to schizophrenia, there are still many challenges in translating these findings into clinical practice. Driven by increasingly larger sample sizes and more advanced analytical methods, we aim to elucidate the genetic structure of schizophrenia, and promote the development of new drug targets and treatments by systematically organizing and summarizing existing genetic studies.
            </Paragraph>
          </div>
          <div id={'data collection'}>
            <Title level={1}>2. Data collection</Title>
			      <Table dataSource={dataSource} columns={columns} bordered={true} pagination={{ position: ["bottomCenter"] }} />
            <p/>
            <Paragraph>
              The data resources contained in SZGR 3.0 can be roughly divided into 5 parts:
            </Paragraph>
			<Paragraph>(1) Curate candidate variants and genes associated with schizophrenia.</Paragraph>
			<Paragraph>
        {'For the candidate variant set, we collected schizophrenia-related common variants (CVs), copy number variations (CNVs), de novo mutations (DNMs), rare/ultrarare variants (RVs), and structural variants (SVs) reported in various studies, like genome-wide association studies (GWASs), family studies, and case-control studies. GWAS significant results were filtered using a threshold of p < 5×10-8, while significant results from other studies were taken as reported in the original publications.'}
      </Paragraph>
			<Paragraph>
        {'For the candidate gene set, we collected potential genes identified through various approaches such as differential analysis, association studies, summary-based Mendelian Randomization (SMR), colocalization of GWAS and QTL signals (COLOC), and experimental analyses, based on transcription levels, methylation levels, and protein levels. We unified the significance thresholds according to the analysis methods: differential analysis results were filtered using p < 0.01 or FDR < 0.05; association studies used p < 1×10-4 or FDR < 0.05; COLOC analysis applied PP4 > 0.75 threshold; and SMR analysis used FDR < 0.05 and HEIDI p < 0.05.'}
            </Paragraph>
			<Paragraph>(2) Identify target genes of variants under different molecular levels and brain cell lines.</Paragraph>
			<Paragraph>
              The variant-gene links we collected originate from chromatin co-accessibility, chromatin interaction (PCHi-C), enhancer activity (Activity-by-contact (ABC) model and Roadmap Epigenomics Enhancer-Gene Linking), and five molecular QTLs: gene expression QTL (eQTL), splicing QTL (sQTL), protein QTL (pQTL), chromatin accessibility QTL (caQTL), and H3K27 histone acetylation QTL (haQTL).
      </Paragraph>
			<Paragraph>(3) Collect experimental evidence from large-scale experiments and single-point verification.</Paragraph>
			<Paragraph>
              We specifically collected massively parallel reporter assays (MPRAs) and CRISPR/Cas9 screening conducted on induced pluripotent stem cells (iPSCs) or neural cells, as well as transcriptome studies on schizophrenia patients. Additionally, we extensively searched the literature for experimental evidence validating schizophrenia variants and genes. We recorded the validated variants/genes, experimental tissue/cell line samples, organism, and sources.
            </Paragraph>
			<Paragraph>(4) Integrate single-cell omics data from patients, different brain regions and developmental stages.</Paragraph>
			<Paragraph>
              To facilitate interpretation, we integrated single-cell omics data from 7 brain regions—cerebellum, forebrain, hippocampus, hippocampal-entorhinal system, neocortex, ganglionic eminences, and cortex—across various developmental stages, including gestation, fetal, infancy, childhood, adolescence, and adulthood, as well as from 140 schizophrenia patients. This comprehensive analysis aims to elucidate the developmental stages and cell types associated with disease-related genes.
            </Paragraph>
			<Paragraph>(5) Collect available drug and target information.</Paragraph>
			<Paragraph>
              We annotated potential drug targets among schizophrenia genes based on the ChEMBL and Open Targets databases to help evaluate the repositioning and repurposing of existing drugs.
            </Paragraph>
          </div>
          <div id={'data analysis'}>
            <Title level={1}>3. Data analysis </Title>
            <Row justify={'center'}>
                <Image src={workflow} preview={false} width={'75%'} />
            </Row>
            <Row justify={'center'}><Text strong={true}>Figure 1. The workflow of SZGR.</Text></Row>
            <div id={'annotation'}>
              <Title level={2}>
                3.1 Annotation
              </Title>
              <Paragraph>
                For the collected variants, we annotated them with population frequencies using the 1000 Genomes Project (hg19). To attribute functional effects to the variants, we predicted their functional effects using EIGEN, CADD, FunSeq2, and fitCons tools, and identified their potential target genes through chromatin co-accessibility, chromatin interactions, enhancer activity and QTL analyses.
              </Paragraph>
              <Paragraph>
                For the collected genes and variant-annotated target genes, we performed differential expression analysis and trajectory analysis using single-cell omics data to elucidate their cell-type-specific and developmental-stage-specific expression.
              </Paragraph>
            </div>
            <div id={'validation'}>
              <Title level={2}>
                3.2 Validation
              </Title>
              <Paragraph>
                {'We uniformly aligned the variants positions with experimental evidence to the hg19 reference genome. For loci or genes that did not provide clear genomic locations, we annotated the genomic regions according to the cytogenetic bands or gene symbols reported in the publication. MPRA-validated variants were defined according to FDR < 0.05, and CRISPR/Cas9-validated variants were defined according to p < 0.05. Differentially expressed genes validated by RNA-seq were screened according to FDR < 0.05. The remaining reproducible variants or gene sets were based on the positive results reported in the publications.'}
              </Paragraph>
            </div>
            <div id={'integration analysis'}>
              <Title level={2}>
                3.3 Integration analysis
              </Title>
              <Paragraph>
                First, we comprehensively evaluate highly reproducible variants and gene sets based on multiple lines of evidence from computational and experimental studies. Variants are marked based on evidence from caQTL, eQTL, haQTL, meQTL, pQTL, MPRA, CRISPR/Cas9 hits, and other experimental reports from publications. Genes are marked based on evidence from DEG, DEP, DMG, TWAS, EWAS, eQTL based post-GWAS analysis, meQTL based post-GWAS analysis, CRISPR/Cas9 hits, CRISPR/Cas9 targets, and other experimental reports from publications. If evidence exists, it is recorded as 1, otherwise it is 0. We score and rank variants and genes based on the sum of all evidence records. In addition, to evaluate the integrative effects of gene sets, we also provide users with analysis tools that can be used to analyze cell type-specific enrichment and co-expression networks in combination with single-cell omics data.
              </Paragraph>
            </div>
          </div>
          <div id={'database usage'}>
            <Title level={1}>4. Database usage</Title>
            <div id={'search'}>
              <Title level={2}>
                4.1 Search
              </Title>
              <Image src={usage_1} preview={false}></Image>
              <Paragraph>
               Home: The search function provided on the homepage supports quick query of projects in various forms based on keywords, such as mutation name, position or gene symbol.
              </Paragraph>
              <Image src={usage_2} preview={false}></Image>
              <Paragraph>
                Variant view: This view can be accessed by searching for a variant or clicking on a variant contained in another page. The variant view contains the curated variant-schizophrenia association information, 1000 Genomes frequency, effect prediction results, target genes, and experimental validation.
              </Paragraph>
              <Image src={usage_3} preview={false}></Image>
			  <Paragraph>
                Location view: this page shows all curated variants in the searched location. Users can click on the interested variant to enter the variant view for detailed information.
              </Paragraph>
              <Image src={usage_4} preview={false}></Image>
			  <Paragraph>
                Gene view: This view can be accessed by searching for a gene or clicking on a gene contained in another page. This page contains curated schizophrenia-gene association information, experimental evidence, functional annotations based on single-cell omics data and drug repositioning results.
              </Paragraph>
            </div>
            <div id={'browse-variant'}>
              <Title level={2}>
                4.2 Browse-variant
              </Title>
              <Image src={usage_5} preview={false}></Image>
              <Paragraph>
                This page shows all variants associated with schizophrenia that we curated from the publications, including CV, RV, SV, CNV and DNM.
              </Paragraph>
            </div>
            <div id={'browse-gene'}>
              <Title level={2}>
                4.3 Browse-gene
              </Title>
              <Image src={usage_6} preview={false}></Image>
              <Paragraph>
                This page shows the lines of evidence for schizophrenia-associated genes that we curated from the publications, presented according to the method of identification.
              </Paragraph>
            </div>
            <div id={'advance'}>
              <Title level={2}>
                4.4	Advance
              </Title>
              <Image src={usage_7} preview={false}></Image>
              <Paragraph>
                This page contains further analysis results of variants and genes, like assessments of the reproducibility of evidence from in silico methods and biological experiments, scRNA-seq analysis results, and target information for drugs.
              </Paragraph>
            </div>
            <div id={'toolkit'}>
              <Title level={2}>
                4.5	Toolkit
              </Title>
              <Image src={usage_8} preview={false}></Image>
              <Paragraph>
                Here we provide two user-friendly online analysis tools that can perform cell type-specific enrichment analysis and co-expression network analysis based on single-cell datasets.
              </Paragraph>
            </div>
            <div id={'resource'}>
              <Title level={2}>
                4.6	Resource
              </Title>
              <Image src={usage_9} preview={false}></Image>
              <Paragraph>
                We have organized the core data of SZGR and provided a user-friendly download interface.
              </Paragraph>
            </div>
            </div>
         <div id={'licenses'}>
            <Title level={1}>5. Licenses</Title>
            <Paragraph>
              SZGR is free for academic use only. For any commercial use, please contact us for commercial licensing terms.
            </Paragraph>
          </div>
        </Col>
      </Row>
    </div>
  );
}
