import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

type SEOProps = {
  title?: string;
  description?: string;
  ogImage?: {
    url: string;
    width: number;
    height: number;
  };
};

const SEO: React.FC<SEOProps> = ({ title, description, ogImage }: SEOProps) => {
  const siteTitle = 'GLOG'; // 사이트 제목
  const siteDescription =
    '개발자들을 위해 만들어진 블로그를 작성해보세요! 발자국 시스템, PR 시스템으로 블로그를 꾸준히 쓸 수 있도록 도와줍니다.'; // 사이트 설명
  const siteUrl = 'http://15.164.221.35:3000'; // 사이트 URL
  const defaultOgImage = {
    url: `${siteUrl}/GLOG_LOGO.png`,
    width: 1200,
    height: 630,
  };

  return (
    <>
      <DefaultSeo
        title={title ? `${title} | ${siteTitle}` : siteTitle}
        description={description || siteDescription}
        canonical={siteUrl}
        openGraph={{
          url: siteUrl,
          title: title || siteTitle,
          description: description || siteDescription,
          images: ogImage ? [ogImage] : [defaultOgImage],
          site_name: siteTitle,
        }}
      />
      <Head>{/* 추가적인 head 설정 */}</Head>
    </>
  );
};

export default SEO;
