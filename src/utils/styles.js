import styled from "styled-components"

export const PageHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

export const Page = styled.div`
    width: 100%;
    background: #eeeeee;
    padding: 110px 10% 30px;
    min-height: calc(100vh - 70px);

    .input{
        margin-bottom: 10px;
    }
    .page__subtitle{
        margin-left: 10px;
    }
`

export const PageForm = styled.div`
    background-color: #ffff;
    margin-bottom: 20px;
    border-radius: 4px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
`