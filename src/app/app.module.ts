import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {FaqPage} from "../pages/faq/faq";
import {FaqItemPage} from "../pages/faq/faq.item";
import {ContinuarRegistroPage} from "../pages/continuar-registro/continuar-registro";
import {AutenticarRegistroPage} from "../pages/autenticar-registro/autenticar-registro";
import {RetificarRegistroPage} from "../pages/retificar-registro/retificar-registro";
import {TermosCondicoesPage} from "../pages/registro/termos-condicoes/termos-condicoes";
import {InformacoesIniciaisPage} from "../pages/registro/informacoes-iniciais/informacoes-iniciais";
import {NarrativaPage} from "../pages/registro/narrativa/narrativa";
import {FinalizaRegistroPage} from "../pages/registro/finaliza-registro/finaliza-registro";
import {InformacoesGeraisPage} from "../pages/registro/informacoes-gerais/informacoes-gerais";
import {RegistroNavComponent} from "../components/registro-nav/registro-nav.component";
import {FotosVeiculoComponent} from "../components/fotos-veiculo/fotos-veiculo.component";
import {NavComponent} from "../components/nav/nav-component";
import {VeiculosPage} from "../pages/registro/veiculos/veiculos";
import {OutrosVeiculosPage} from "../pages/registro/outros-veiculos/outros-veiculos";
import {FormEnumService} from "../services/form-enum";
import {IonicStorageModule} from "@ionic/storage";
import {RegistroService} from "../services/registro";
import {EnderecoService} from "../services/endereco";
import {EnderecoForm} from "../components/forms/endereco/endereco";
import {DeclaranteForm} from "../components/forms/declarante/declarante";
import {DadosAcidenteForm} from "../components/forms/dados-acidente/dados-acidente";
import {CondutorForm} from "../components/forms/condutor/condutor";
import {ProprietarioForm} from "../components/forms/proprietario/proprietario";
import {DanosCargaForm} from "../components/forms/danos-carga/danos-carga";
import {TextMaskModule} from "angular2-text-mask";
import {IntroSlidesComponent} from "../components/intro-slides/intro-slides";
import {FaqService} from "../services/faq";
import { BackgroundMode } from '@ionic-native/background-mode';
import {VeiculoForm} from "../components/forms/veiculo/veiculo";
import {OutrosVeiculosModal} from "../pages/registro/outros-veiculos/outros-veiculos-modal";
import {FormErrorComponent} from "../components/forms/form-errors/form-errors";

import { Camera } from "@ionic-native/camera";
import { AppVersion } from '@ionic-native/app-version';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FaqPage,
    FaqItemPage,
    ContinuarRegistroPage,
    TermosCondicoesPage,
    InformacoesIniciaisPage,
    InformacoesGeraisPage,
    VeiculosPage,
    OutrosVeiculosPage,
    NarrativaPage,
    FinalizaRegistroPage,
    AutenticarRegistroPage,
    RetificarRegistroPage,
    RegistroNavComponent,
    FotosVeiculoComponent,
    NavComponent,
    EnderecoForm,
    DeclaranteForm,
    DadosAcidenteForm,
    CondutorForm,
    DeclaranteForm,
    ProprietarioForm,
    DanosCargaForm,
    IntroSlidesComponent,
    VeiculoForm,
    OutrosVeiculosModal,
    FormErrorComponent,
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Voltar',      
    }),
    TextMaskModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FaqPage,
    FaqItemPage,
    ContinuarRegistroPage,
    TermosCondicoesPage,
    InformacoesIniciaisPage,
    InformacoesGeraisPage,
    VeiculosPage,
    OutrosVeiculosPage,
    NarrativaPage,
    FinalizaRegistroPage,
    AutenticarRegistroPage,
    RetificarRegistroPage,
    RegistroNavComponent,
    FotosVeiculoComponent,
    NavComponent,
    EnderecoForm,
    DeclaranteForm,
    DadosAcidenteForm,
    CondutorForm,
    DeclaranteForm,
    ProprietarioForm,
    DanosCargaForm,
    IntroSlidesComponent,
    OutrosVeiculosModal,
    FormErrorComponent,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar, SplashScreen,
    BackgroundMode,
    FormEnumService, RegistroService, EnderecoService, FaqService,
    Camera, AppVersion
    
  ]
})
export class AppModule {
}