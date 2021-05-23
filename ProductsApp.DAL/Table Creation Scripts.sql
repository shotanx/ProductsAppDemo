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
ProductCode NVARCHAR(400) NOT NULL,
ProductName NVARCHAR(400) NOT NULL,
ProductPrice DECIMAL NOT NULL,
ProductTypeID UNIQUEIDENTIFIER NOT NULL,
CountryID UNIQUEIDENTIFIER NOT NULL,
StartDate DateTime NOT NULL,
EndDate DateTime NOT NULL,
DateCreated DateTime NOT NULL CONSTRAINT DF_Products_DateCreated DEFAULT GETDATE(),
DateChanged DateTime NULL,
DateDeleted DateTime NULL,
CONSTRAINT PK_Products PRIMARY KEY (ID),
CONSTRAINT FK_Products_ProductTypes FOREIGN KEY (ProductTypeID) REFERENCES ProductTypes(ID),
CONSTRAINT FK_Products_Countries FOREIGN KEY (CountryID) REFERENCES Countries(ID)
)

GO
  --INSERT INTO [ProductsApp].[dbo].[Products]
  --(
  --ProductCode, ProductName, ProductPrice, ProductTypeID, CountryID, StartDate, EndDate
  --)
  --Values
  --('001',N'პროდუქტი1',5,'D90BF71D-059C-4EEB-9DF9-08DC7FC1EFB7','7CD26A21-A505-4DC7-A0B2-21C003996F3A', GETDATE(), GETDATE())
---------------------------
-- Countries
---------------------------
CREATE TABLE ProductsApp.dbo.Countries
(
ID UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_Countries_ID DEFAULT NEWID(),
CountryName NVARCHAR(400) NOT NULL,
DateCreated DateTime NOT NULL CONSTRAINT DF_Countries_DateCreated DEFAULT GETDATE(),
DateChanged DateTime NULL,
DateDeleted DateTime NULL,
CONSTRAINT PK_Countries PRIMARY KEY (ID)
)

GO
---------------------------
-- C
---------------------------