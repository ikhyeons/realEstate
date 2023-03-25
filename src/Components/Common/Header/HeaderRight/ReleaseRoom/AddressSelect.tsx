import styled from 'styled-components'
import { kakaoKey } from '../../../../../../secretKeysF'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { AroomModifyAddressAndL } from '../../../../../AtomStorage'
interface Iaddress {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
}

const Sul = styled.ul`
  position: absolute;
  left: 5px;
  top: 100px;
  background: white;
  border-radius: 5px;
  min-width: 450px;
  max-height: min(500px, 100vh - 62px);
  overflow-y: auto;
  border: 2px solid black;
  &::-webkit-scrollbar {
    width: 5px;
    padding-right: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #ccc;
    background: yellow;
  }
`

const Sli = styled.li`
  font-size: 20px;
  list-style: none;
  padding: 5px;
  padding-right: 15px;
  cursor: pointer;
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const Sinput = styled.input`
  padding: 3px;
  font-size: 15px;
  width: 250px;
`

const AddressSelect = () => {
  const modalRef = useRef<HTMLUListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const [addressData, setAddressData] = useState<Iaddress[] | null>(null)
  const [onSearch, setOnSearch] = useState(false)
  const [seletedAddress, setSelectedAddress] = useRecoilState<any>(
    AroomModifyAddressAndL,
  )

  useEffect(() => {
    if (value !== '') {
      axios
        .get(
          `https://dapi.kakao.com/v2/local/search/keyword.json?&query=${value}`,
          {
            headers: {
              Authorization: `KakaoAK ${kakaoKey.restAPI}`,
            },
          },
        )
        .then((data) => {
          setOnSearch(true)
          setAddressData(data.data.documents)
          if (value === '' || data.data.documents.length === 0) {
            setOnSearch(false)
          }
        })
    }
  }, [value])

  const outFocusHandler = (e: MouseEvent) => {
    if (inputRef.current === e.target) {
    } else if (
      !modalRef.current ||
      !modalRef.current?.contains(e.target as null)
    ) {
      setOnSearch(false)
      inputRef.current?.blur()
    }
  }

  useEffect(() => {
    window.addEventListener('click', (e) => {
      outFocusHandler(e)
    })
    return window.removeEventListener('click', (e) => {
      outFocusHandler(e)
    })
  }, [])

  return (
    <>
      <Sinput
        ref={inputRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onFocus={(e) => {
          setOnSearch(true)
        }}
        onClick={() => {
          setOnSearch(true)
        }}
        type="text"
        placeholder="Search"
      />
      {onSearch && (value !== '') === true ? (
        <Sul ref={modalRef}>
          {addressData !== null
            ? addressData.map((data, i) => (
                <Sli
                  onClick={() => {
                    setValue(data.address_name)
                    setSelectedAddress({
                      address: data.address_name,
                      lng: data.x,
                      lat: data.y,
                    })
                    setOnSearch(false)
                  }}
                  key={i}
                >
                  {data.address_name}
                </Sli>
              ))
            : null}
        </Sul>
      ) : null}
    </>
  )
}

export default AddressSelect