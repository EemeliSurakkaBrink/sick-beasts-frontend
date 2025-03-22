flowchart TD
    A[Start]
    B[Homepage Carousel]
    C[Product Page]
    D[Add to Basket]
    E[Checkout]
    F{User Type: Guest or Account?}
    G[Guest Checkout]
    H[Account Login]
    I[Process Payment]
    J{Select Payment Method}
    K[Credit Card Payment]
    L[PayPal Payment]
    M[Order Confirmation]
    N[Order Tracking]
    O[14-day Cooling Off and Shipping/Returns]
    P[Marketing Tools]
    Q[Email Marketing]
    R[Instagram Integration]
    S[Admin Interface]
    T[Manage Products]
    U[Manage Orders]
    V[Manage Customers]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F -- Guest --> G
    F -- Account --> H
    G --> I
    H --> I
    I --> J
    J -- Credit Card --> K
    J -- PayPal --> L
    K --> M
    L --> M
    M --> N
    N --> O
    B -- Marketing --> P
    P --> Q
    P --> R
    O --> S
    S --> T
    S --> U
    S --> V