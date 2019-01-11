using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Pdnative.RNPdnative
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNPdnativeModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNPdnativeModule"/>.
        /// </summary>
        internal RNPdnativeModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNPdnative";
            }
        }
    }
}
