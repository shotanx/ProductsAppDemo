---------------------------
-- ProductTypes
---------------------------
CREATE TABLE ProductsApp.dbo.ProductTypes
(
ID UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_ProductTypes_ID DEFAULT NEWID(),
ProductTypeName NVARCHAR(400) NOT NULL,
ParentID UNIQUEIDENTIFIER NULL,
DateCreated DateTime NOT NULL CONSTRAINT DF_ProductTypes_DateCreated DEFAULT GETDATE(),
DateChanged DateTime NULL,
DateDeleted DateTime NULL,
CONSTRAINT PK_ProductTypes PRIMARY KEY (ID),
CONSTRAINT FK_ProductTypes_ProductTypes FOREIGN KEY (ParentID) REFERENCES ProductTypes(ID)
)

GO

---------------------------
-- Products
---------------------------
CREATE TABLE ProductsApp.dbo.Products
(
ID UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_Products_ID DEFAULT NEWID(),
ProductName NVARCHAR(400) NOT NULL,
ProductTypeID UNIQUEIDENTIFIER NOT NULL,
DateCreated DateTime NOT NULL CONSTRAINT DF_Products_DateCreated DEFAULT GETDATE(),
DateChanged DateTime NULL,
DateDeleted DateTime NULL,
CONSTRAINT PK_Products PRIMARY KEY (ID),
CONSTRAINT FK_Products_ProductTypes FOREIGN KEY (ProductTypeID) REFERENCES ProductTypes(ID)
)

GO