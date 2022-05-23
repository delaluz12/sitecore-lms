using NUnit.Framework;
using NSubstitute;
using OrderCloud.SDK;
using System.Collections.Generic;
using Headstart.Common;
using ordercloud.integrations.cardconnect;
using System.Threading.Tasks;
using Headstart.Common.Services.ShippingIntegration.Models;
using ordercloud.integrations.library;
using Headstart.Models.Headstart;
using Headstart.Models;
using System;
using NSubstitute.ExceptionExtensions;
using Headstart.API.Commands;
using OrderCloud.Catalyst;
using ordercloud.integrations.docebo;

namespace Headstart.Tests
{
    public class OrderSubmitCommandTests
    {
        private IOrderCloudClient _oc;
        private AppSettings _settings;
        private ICreditCardCommand _card;
        private IOrderSubmitCommand _sut;
        private IOrderCloudIntegrationsDoceboService _docebo;

        [SetUp]
        public void Setup()
        {
            _oc = Substitute.For<IOrderCloudClient>();
            _settings = Substitute.For<AppSettings>();
            _settings.CardConnectSettings = new OrderCloudIntegrationsCardConnectConfig
            {
                UsdMerchantID = "mockUsdMerchantID",
                CadMerchantID = "mockCadMerchantID",
                EurMerchantID = "mockEurMerchantID"
            };
            _settings.OrderCloudSettings = new OrderCloudSettings
            {
                IncrementorPrefix = "SEB"
            };
            _card = Substitute.For<ICreditCardCommand>();
            _docebo = Substitute.For<IOrderCloudIntegrationsDoceboService>();
            _card.AuthorizePayment(Arg.Any<OrderCloudIntegrationsCreditCardPayment>(), "mockUserToken", Arg.Any<string>())
                    .Returns(Task.FromResult(new Payment { }));

            _oc.Orders.PatchAsync(OrderDirection.Incoming, "mockOrderID", Arg.Any<PartialOrder>()).Returns(Task.FromResult(new Order { ID = "SEB12345" }));
            _oc.AuthenticateAsync().Returns(Task.FromResult(new TokenResponse { AccessToken = "mockToken" }));
            _oc.Orders.SubmitAsync<HSOrder>(Arg.Any<OrderDirection>(), Arg.Any<string>(), Arg.Any<string>()).Returns(Task.FromResult(new HSOrder { ID = "submittedorderid" }));
            _sut = new OrderSubmitCommand(_oc, _settings, _card, _docebo); // sut is subject under test
        }

        /* [Test]
        public async Task should_throw_if_order_is_already_submitted()
        {
            // Arrange
            _oc.IntegrationEvents.GetWorksheetAsync<HSOrderWorksheet>(OrderDirection.Incoming, "mockOrderID").Returns(Task.FromResult(new HSOrderWorksheet
            {
                Order = new Models.HSOrder { ID = "mockOrderID", IsSubmitted = true }
            }));

            // Act
            var ex = Assert.ThrowsAsync<CatalystBaseException>(async () => await _sut.SubmitOrderAsync("mockOrderID",  OrderDirection.Outgoing, new OrderCloudIntegrationsCreditCardPayment { }, "mockUserToken"));

            // Assert
            Assert.AreEqual("OrderSubmit.AlreadySubmitted", ex.Errors[0].ErrorCode);
        }

        [Test]
        public async Task should_not_increment_orderid_if_is_resubmitting()
        {
            // Arrange
            _oc.IntegrationEvents.GetWorksheetAsync<HSOrderWorksheet>(OrderDirection.Incoming, "mockOrderID").Returns(Task.FromResult(new HSOrderWorksheet
            {
                Order = new HSOrder { ID = "mockOrderID", IsSubmitted = false, xp = new OrderXp { IsResubmitting = true } },
                ShipEstimateResponse = new HSShipEstimateResponse
                {
                    ShipEstimates = new List<HSShipEstimate>()
                    {
                        new HSShipEstimate
                        {
                            SelectedShipMethodID = "FEDEX_GROUND"
                        }
                    }
                },
                LineItems = new List<HSLineItem>()
                {
                    new HSLineItem
                    {
                        Product = new HSLineItemProduct
                        {
                            xp = new ProductXp
                            {
                                ProductType = ProductType.Standard
                            }
                        }
                    }
                }
            }));



            // Act
            await _sut.SubmitOrderAsync("mockOrderID",  OrderDirection.Outgoing, new OrderCloudIntegrationsCreditCardPayment(), "mockUserToken");

            // Assert
            await _oc.Orders.DidNotReceive().PatchAsync(OrderDirection.Incoming, "mockOrderID", Arg.Any<PartialOrder>());
        }

        [Test]
        public async Task should_not_increment_orderid_if_is_already_incremented()
        {
            // Arrange
            _oc.IntegrationEvents.GetWorksheetAsync<HSOrderWorksheet>(OrderDirection.Incoming, "mockOrderID").Returns(Task.FromResult(new HSOrderWorksheet
            {
                Order = new HSOrder { ID = "SEBmockOrderID", IsSubmitted = false, xp = new OrderXp { } },
                ShipEstimateResponse = new HSShipEstimateResponse
                {
                    ShipEstimates = new List<HSShipEstimate>()
                    {
                        new HSShipEstimate
                        {
                            SelectedShipMethodID = "FEDEX_GROUND"
                        }
                    }
                },
                LineItems = new List<HSLineItem>()
                {
                    new HSLineItem
                    {
                        Product = new HSLineItemProduct
                        {
                            xp = new ProductXp
                            {
                                ProductType = ProductType.Standard
                            }
                        }
                    }
                }
            }));



            // Act
            await _sut.SubmitOrderAsync("mockOrderID",  OrderDirection.Outgoing, new OrderCloudIntegrationsCreditCardPayment(), "mockUserToken");

            // Assert
            await _oc.Orders.DidNotReceive().PatchAsync(OrderDirection.Incoming, "mockOrderID", Arg.Any<PartialOrder>());
        }

        [Test]
        public async Task should_increment_orderid_if_has_not_been_incremented_and_is_not_resubmit()
        {
            // Arrange
            _oc.IntegrationEvents.GetWorksheetAsync<HSOrderWorksheet>(OrderDirection.Incoming, "mockOrderID").Returns(Task.FromResult(new HSOrderWorksheet
            {
                Order = new HSOrder { ID = "mockOrderID", IsSubmitted = false, xp = new OrderXp { IsResubmitting = false } },
                ShipEstimateResponse = new HSShipEstimateResponse
                {
                    ShipEstimates = new List<HSShipEstimate>()
                    {
                        new HSShipEstimate
                        {
                            SelectedShipMethodID = "FEDEX_GROUND"
                        }
                    }
                },
                LineItems = new List<HSLineItem>()
                {
                    new HSLineItem
                    {
                        Product = new HSLineItemProduct
                        {
                            xp = new ProductXp
                            {
                                ProductType = ProductType.Standard
                            }
                        }
                    }
                }
            }));

            // Act
            await _sut.SubmitOrderAsync("mockOrderID",  OrderDirection.Outgoing, new OrderCloudIntegrationsCreditCardPayment(), "mockUserToken");

            // Assert
            await _oc.Orders.Received().PatchAsync(OrderDirection.Incoming, "mockOrderID", Arg.Any<PartialOrder>());
        }

        [Test]
        public async Task should_handle_direction_outgoing()
        {
            // call order submit with direction outgoing

            // Arrange
            _oc.IntegrationEvents.GetWorksheetAsync<HSOrderWorksheet>(OrderDirection.Incoming, "mockOrderID").Returns(Task.FromResult(new HSOrderWorksheet
            {
                Order = new HSOrder { ID = "mockOrderID", IsSubmitted = false, xp = new OrderXp { IsResubmitting = false } },
                ShipEstimateResponse = new HSShipEstimateResponse
                {
                    ShipEstimates = new List<HSShipEstimate>()
                    {
                        new HSShipEstimate
                        {
                            SelectedShipMethodID = "FEDEX_GROUND"
                        }
                    }
                },
                LineItems = new List<HSLineItem>()
                {
                    new HSLineItem
                    {
                        Product = new HSLineItemProduct
                        {
                            xp = new ProductXp
                            {
                                ProductType = ProductType.Standard
                            }
                        }
                    }
                }
            }));

            // Act
            await _sut.SubmitOrderAsync("mockOrderID", OrderDirection.Outgoing, new OrderCloudIntegrationsCreditCardPayment { }, "mockUserToken");

            // Assert
            await _oc.Orders.Received().SubmitAsync<HSOrder>(OrderDirection.Outgoing, Arg.Any<string>(), Arg.Any<string>());
        }

        [Test]
        public async Task should_handle_direction_incoming()
        {
            // call order submit with direction incoming

            // Arrange
            _oc.IntegrationEvents.GetWorksheetAsync<HSOrderWorksheet>(OrderDirection.Incoming, "mockOrderID").Returns(Task.FromResult(new HSOrderWorksheet
            {
                Order = new HSOrder { ID = "mockOrderID", IsSubmitted = false, xp = new OrderXp { IsResubmitting = false } },
                ShipEstimateResponse = new HSShipEstimateResponse
                {
                    ShipEstimates = new List<HSShipEstimate>()
                    {
                        new HSShipEstimate
                        {
                            SelectedShipMethodID = "FEDEX_GROUND"
                        }
                    }
                },
                LineItems = new List<HSLineItem>()
                {
                    new HSLineItem
                    {
                        Product = new HSLineItemProduct
                        {
                            xp = new ProductXp
                            {
                                ProductType = ProductType.Standard
                            }
                        }
                    }
                }
            }));

            // Act
            await _sut.SubmitOrderAsync("mockOrderID", OrderDirection.Incoming, new OrderCloudIntegrationsCreditCardPayment { }, "mockUserToken");

            // Assert
            await _oc.Orders.Received().SubmitAsync<HSOrder>(OrderDirection.Incoming, Arg.Any<string>(), Arg.Any<string>());
        }*/
    }
}
