import { Nav } from "react-bootstrap";
import styled from "styled-components";

export const StyledNavLink = styled(Nav.Link)`
  text-align: center;
  border-radius: 25px;
  border: 2px solid #3cd6b1;
  margin-bottom: 5px;
  margin-top: 5px;
  &:hover {
    background-color: #3cd6b1;
    color: black !important;
    cursor: image-set(
          url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAFoTx1HAAAABGdBTUEAALGPC/xhBQAAARVJREFUKBWNkkEKwjAQRVuzcFEIQhdCLyAUuugJCr2UF/BEPYFrPYA3ELoTXHUh9b9pArZUcWAyk5n/JzNJkkQyjmM5LfJxCqIpGe/9NUZGAm3bHskmOMpebMMiXi11xovRTXTMKu2dc0/ZygJd17VyrDI2z/MzICv2mYg+bJIOZAxGS1lON4DMQbqV9mma3mUt4ZfM0MM0EZilqmyR2MHryXqTZdmN8isy0AzDzsqGOZ0RAHCTHMGtau9nlQgAilcOEIUUCNWMpI2DsBx12Qb70AoFHL2W4VFn/a4RiYGFA7H+dkVrZLBw+B990zQn2b8kYHsDq4Ln+X7NSQ4MWEj2QeJRCvIGe+lOymdBBulDysd5EUDeOjDjnsAenzwAAAAASUVORK5CYII=")
            1x,
          url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAEFCu8CAAAABGdBTUEAALGPC/xhBQAAAxlJREFUSA21ls9qU0EUxm8amtI0BRPowihEXZQWsugfCkpCNvoCdpkHcNsXEH2GvkLdFdruXbrRBxCCLqobdRdFU6Fp5fr9JjM3M7k36a3SgXNn5sz3nTNn/py5UWRLHMerNAuuT91oNF5FdiRW34kZObAKgBqK4yY1fGCmzLmGqQVZViM+OTl57BRbKJwUi8WfBmSNJQMOYOsoAjmhHJvVANOpSzYlZfpJ6Xa7z9RJTAuwbQZtIxlwIOmb0eLi4ken8GtIc5VK5bOU2WWG2aph+IBCoXCp/kbKlJRrADudznPmovh/raysvD46OnqCXrIQkCBMhipAKjp5/IMBN5U6HrKA03SGrM8mU5oGytJD5Hx8ODw8fKo6V2G6CVAWFrBilanYBDS6drv9Ujizqu54+0Y4t+HqjUZPZfi7A2YROVl3JUuSC0lfhK+qs4ubLnvG3rFg7CUrThiStRRTymUGsw68wCY+9lkYrtK4QLpqYYSOLXnkWaSm7ry72VNXFCKCE+PSNq4kOKKNuY4JLOQmsmDiNMPMYuYw+zMcDm8LMX9tYq1WeyvimZmqVvRSnVzTtXezDLFqc96VRPbZrskoHnU2Wq3Wi1le2WdIkvAcQ8Zz1rTZZ0siK5sSHHINkqEe2DG/OpfB974iIPoDtK2hO2qG05sEjvvnan6Rk+T6jYemtOSEi7Ih2SZkwssKW/RgE8CAhQPX2kiWJOVOALKOccTGyAApKTCatw/XZifnOFwhOapKTESzUkBehw6HLS/i5CUq44yDm2fpnLG8NTa9B8tcjFUckg3zGrkuDtv4kKxy98nVUb/ff0R9E8WzvYRDHoaoVCp9uwlnE7YvcNhHubOzc0B9E8WzbXxxwZus8XWeDk0s15Xx0pT5v0wCkkPzS8QD9j930E0EG/Yx5LCkn2I8a4AssyXZBvwvdxKO5whbQbbJzKUCkRnuS8wJPj4+ru7v7z/s9XqdwWBwzz5v5qDxP7q+vv5mb2/v3e7ursuhZ+J+UpTk1qBkOgwQ6mgC/O7cklQkJcm8hMIJH0oGkh9y8Fv1zPIXEobue3QaOqkAAAAASUVORK5CYII=")
            2x
        )
        6 6,
      auto !important;
  }
`;