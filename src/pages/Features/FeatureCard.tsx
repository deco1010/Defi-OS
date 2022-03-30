import React, { Component, useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import { CaretUpOutlined } from '@ant-design/icons'

interface CardProps {
  title: string
  description: string
  likes: number
  parentMethod(string): Promise<string>
  isLiked: boolean
}

export const FeatureCard: React.FC<CardProps> = (props: CardProps) => {
  const { title, description, parentMethod, likes, isLiked } = props
  const [like, setLike] = useState(likes)
  const [isFeatureLiked, setIsLiked] = useState(isLiked)
  console.log(isFeatureLiked)
  console.log(isLiked)

  useEffect(() => {
    setIsLiked(isLiked)
  }, [isLiked])

  function keyClick() {
    return true
  }

  return (
    <div
      tabIndex={-1}
      className="py-2"
      role="button"
      style={{ display: 'flex' }}
      onClick={async () => {
        const newLike = await parentMethod('empty')
        setIsLiked(JSON.parse(newLike).isLiked)
        setLike(JSON.parse(newLike).likes)
      }}
      onKeyDown={keyClick}
    >
      <div
        style={{
          width: '70px',
          height: '70px',
          backgroundColor: isFeatureLiked !== true ? 'white' : '#6EEB7E',
          border: '2px solid #979797',
          borderRadius: '4px',
        }}
      >
        <CaretUpOutlined className="pt-1 opacity-40" style={{ fontSize: '24px' }}></CaretUpOutlined>
        <h1
          style={{
            fontFamily: 'DM Sans',
            fontSize: '28px',
            lineHeight: '34px',
            height: '35px',
            fontStyle: 'normal',
            letterSpacing: ' -0.01em',

            fontWeight: 500,
          }}
          className="text-center font-bold "
        >
          {like}
        </h1>
      </div>
      <div className="pl-2">
        <h1 className="text-left text-24 text-regular font-bold">{title}</h1>
        <p className="text-left text-18 opacity-40 text-regular font-bold">{description}</p>
      </div>
    </div>
  )
}