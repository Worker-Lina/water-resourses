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

export const PageSubtitle = styled.p`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
`

export const Line = styled.div`
    height: 1px;
    background-color: #EEEFF4;
    margin: 15px 0;
`

export const Label = styled.div`
    color: #999898;
    font-size: 12px;
    line-height: 20px;
`

export const LabelError = styled(Label)`
    color: red;
    margin-bottom: 10px;
`