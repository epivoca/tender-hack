import styled from "@emotion/styled";

export const PrimaryButton = styled.button<{ size?: "small" | "medium" }>`
    background: #B91827;
    border: none;
    color: #fff;
    font-size: 14px;
    font-weight: 800;
    padding: ${({ size }) => (size === "small" ? "8px 12px" : "12px 24px")};
    cursor: pointer;
    box-shadow: 0 0 0 0 rgba(34,36,38,.15) inset;
`;

export const CancelButton = styled(PrimaryButton)`
    background: #1a1a1a;
`;

export const GreyButton = styled(PrimaryButton)`
    background: #7f8792;
`;
